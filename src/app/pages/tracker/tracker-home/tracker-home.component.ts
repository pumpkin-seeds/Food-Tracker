import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { emptyFoodItem, FoodItem, UserInfoBE } from 'src/app/common/constants';
import { addFoodNutritionToSummary, getFoodItemObjectFromID, getFoodItemObjectFromId, removeFoodNutritionFromSummary, updateFoodNutritionToSummary } from 'src/app/common/utils';
import { FoodService } from 'src/app/services/food.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-tracker-home',
  templateUrl: './tracker-home.component.html',
  styleUrls: ['./tracker-home.component.css']
})
export class TrackerHomeComponent implements OnInit {

  foodSelected: FoodItem[] = [];
  summaryNutrition: FoodItem = emptyFoodItem;

  constructor(private foodService: FoodService, private userInfoService: UserInfoService) {
  }

  ngOnInit(): void {
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
  onDatePicked(dateSelected: Date): void {
    const formatted = formatDate(dateSelected, 'yyyy-MM-dd', 'en-US')
    this.userInfoService.getUserInfo(formatted, "johnmark")
      .pipe(
        // switchMap(userInfoList => {
        //   userInfoList.forEach(async element => {
            // this.foodSelected.push(await this.foodService
            // .getFoodItemById(element.foodId.toString(), element.quantity));
        //     return this.foodService.getFoodItemById(element.foodId.toString(), element.quantity)
        //       .then(res => this.foodSelected.push(res));
        //   })
        // }),
      )
      .subscribe(
        res => console.log(res)
    )
  }

  // submit all foodSelected to BE
  onSubmit() {
    // TODO(minalong): call service to submit to backend.
  }
}
