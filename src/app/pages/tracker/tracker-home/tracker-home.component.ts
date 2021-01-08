import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { merge } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { emptyFoodItem, FoodItem, UserInfoBE, createUserInfo, FoodInfoBE } from 'src/app/common/constants';
import { addFoodNutritionToSummary, getFoodItemObjectFromID, getFoodItemObjectFromId, removeFoodNutritionFromSummary, updateFoodNutritionToSummary } from 'src/app/common/utils';
import { FoodService } from 'src/app/services/food.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserPreferenceService } from 'src/app/services/user-preference.service';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';

@Component({
  selector: 'app-tracker-home',
  templateUrl: './tracker-home.component.html',
  styleUrls: ['./tracker-home.component.css']
})
export class TrackerHomeComponent implements OnInit {

  foodSelected: FoodItem[] = [];
  commonFood: FoodInfoBE[] = [];  // common food consumed by this user
  summaryNutrition: FoodItem = emptyFoodItem;
  recordDate: string;

  constructor(
    private foodService: FoodService,
    private userInfoService: UserInfoService,
    private userPreferenceService: UserPreferenceService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userPreferenceService.getUserPreferredFood("johnmark", 3).subscribe(
      res => {
        this.commonFood = res;
      }
    );
  }

  // child component autocomplete-search selects a food and emit an event to tracker-home component
  // and add the selected food item to the selected list
  onFoodSelect(foodid: string) {
    if (getFoodItemObjectFromId(foodid, this.foodSelected)) {
      // TODO(minalong): show a warning to user that they're trying to add duplicate food
      return;
    }
    this.foodService.getFoodItemById(foodid)
      .pipe(
        map(res => {
        this.foodSelected.push(res);
        // update current summary nutrition
        this.summaryNutrition = addFoodNutritionToSummary(res, this.summaryNutrition)
        }),
      ).subscribe()
  }

  // child component nutrition-panel deletes a food and emit an event to tracker-home component
  onFoodDeleted(foodItem: FoodItem) {
    this.foodSelected.splice(this.foodSelected.indexOf(foodItem), 1);  // remove obj from foodSelected
    this.summaryNutrition = removeFoodNutritionFromSummary(foodItem, this.summaryNutrition)
  }

  // child component nutrition-panel emits event to change quantity
  onFoodQuantityChange({ foodId, newQuantity }) {
    const foodItem = getFoodItemObjectFromID(foodId, this.foodSelected);
    // if quantity becomes less than 1 consider user is deleting the food item
    // if (newQuantity < 1) {
    //   this.onFoodDeleted(foodItem);
    //   return;
    // }
    const oldQuantity = foodItem.foodQuantity;
    foodItem.foodQuantity = newQuantity;

    // update nutrition summary
    this.summaryNutrition =
      updateFoodNutritionToSummary(foodItem, oldQuantity, newQuantity, this.summaryNutrition);
  }

  // get food selected list from BE
  // TODO: to add userId when app builds authentication
  // TODO: clean up summary when changing dates (total nutrition is wrong)
  onDatePicked(dateSelected: Date): void {
    // if there's no record date, then show error dialog.
    if (!dateSelected) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        title: 'Error: Date',
        content: 'Please select a date!',
      }
      this.dialog.open(SubmitDialogComponent, dialogConfig);
      this.recordDate = null; // reset to null
      return;
    }

    this.foodSelected = [];
    this.summaryNutrition = emptyFoodItem;
    const formatted = formatDate(dateSelected, 'yyyy-MM-dd', 'en-US')
    this.recordDate = formatted;
    this.userInfoService.getUserInfo(formatted, "johnmark")
      .pipe(
        switchMap(userInfoList => {
          const obs = userInfoList.map(element => {
            // console.log(element);
            return this.foodService.getFoodItemById(element.foodId.toString(), element.quantity);
          })
          return merge(...obs);
        }),
      ).subscribe(res => {
        // console.log(res);
        this.foodSelected.push(res);
        this.summaryNutrition = addFoodNutritionToSummary(res, this.summaryNutrition)
      })
  }

  // submit all foodSelected to BE
  onSubmit() {
    // if there's no record date, then do not submit and show error dialog.
    if (!this.recordDate || this.recordDate.length === 0) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        title: 'Error: Date',
        content: 'Please select a date in order to submit!',
      }
      this.dialog.open(SubmitDialogComponent, dialogConfig);
      return;
    }

    let listOfUserRecord: UserInfoBE[] = [];
    for (let food of this.foodSelected) {
      // TODO: to add userId when app builds authentication
      const record = createUserInfo(food, "johnmark", this.recordDate);
      listOfUserRecord.push(record);
    }
    this.userInfoService.submitUserInfo(listOfUserRecord).subscribe(
      () => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          title: 'Success',
          content: 'Submission succeeded!',
        }
        this.dialog.open(SubmitDialogComponent, dialogConfig);
      }
    );
  }
}
