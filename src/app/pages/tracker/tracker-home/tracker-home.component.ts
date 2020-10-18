import { Component, OnInit } from '@angular/core';
import { emptyFoodItem, FoodItem, foodList } from 'src/app/common/constants';
import { addFoodNutritionToSummary, getFoodItemObjectFromID, getFoodItemObjectFromName, parseFoodDisplayNameToFoodName, parseFoodDisplayNameToSize, removeFoodNutritionFromSummary, updateFoodNutritionToSummary } from 'src/app/common/utils';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-tracker-home',
  templateUrl: './tracker-home.component.html',
  styleUrls: ['./tracker-home.component.css']
})
export class TrackerHomeComponent implements OnInit {

  // Pretend home component gets the list from backend
  // right now the list is from the backend
  foodList = foodList;
  foodSelected: FoodItem[] = [];
  summaryNutrition: FoodItem = emptyFoodItem;

  // TODO: testing local backend...
  foodBE = [];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getFoodListById(320413).subscribe(food => this.foodBE.push(food));
  }

  // child component autocomplete-search selects a food and emit an event to tracker-home component
  // and add the selected food item to the selected list
  onFoodSelect(foodname: string) {
    const name = parseFoodDisplayNameToFoodName(foodname);
    const size = parseFoodDisplayNameToSize(foodname);

    // avoid adding the same food item to foodSelectedList - make sure foodSelected is unique
    if (getFoodItemObjectFromName(name, size, this.foodSelected)) {
      // TODO(minalong): show a warning to user that they're trying to add duplicate food
      return;
    }
    const foodObj = getFoodItemObjectFromName(name, size, foodList);
    foodObj.foodQuantity = 1; // set quantity to 1 when first selected
    this.foodSelected.push(foodObj);

    // update current summary nutrition
    this.summaryNutrition = addFoodNutritionToSummary(foodObj, this.summaryNutrition)
    // console.log(this.summaryNutrition);
  }

  // child component nutrition-panel deletes a food and emit an event to tracker-home component
  onFoodDeleted(foodItem: FoodItem) {
    this.foodSelected.splice(this.foodSelected.indexOf(foodItem), 1);  // remove obj from foodSelected
    this.summaryNutrition = removeFoodNutritionFromSummary(foodItem, this.summaryNutrition)
  }

  // child component nutrition-panel emits event to change quantity
  onFoodQuantityChange({ foodId, newQuantity }) {
    const foodItem = getFoodItemObjectFromID(foodId, this.foodSelected);
    // if quantity becomes less than 0.1 consider user is deleting the food item
    if (newQuantity < 0.1) {
      this.onFoodDeleted(foodItem);
      return;
    }
    const oldQuantity = foodItem.foodQuantity;
    foodItem.foodQuantity = newQuantity;

    // update nutrition summary
    this.summaryNutrition =
      updateFoodNutritionToSummary(foodItem, oldQuantity, newQuantity, this.summaryNutrition);
  }

  // submit current page selections
  onSubmit() {
    // TODO(minalong): call service to submit to backend.
  }
}
