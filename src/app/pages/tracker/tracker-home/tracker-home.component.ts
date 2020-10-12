import { Component, OnInit } from '@angular/core';
import { emptyFoodItem, FoodItem, foodList } from 'src/app/common/constants';
import { addFoodNutritionToSummary, getFoodItemObject, parseFoodDisplayNameToFoodName, parseFoodDisplayNameToSize, removeFoodNutritionFromSummary } from 'src/app/common/utils';

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

  constructor() { }

  ngOnInit(): void {
  }

  // child component autocomplete-search selects a food and emit an event to tracker-home component
  // and add the selected food item to the selected list
  onFoodSelect(foodname: string) {
    const name = parseFoodDisplayNameToFoodName(foodname);
    const size = parseFoodDisplayNameToSize(foodname);
    const foodObj = getFoodItemObject(name, size, foodList);
    this.foodSelected.push(foodObj);

    // update current summary nutrition
    this.summaryNutrition = addFoodNutritionToSummary(foodObj, this.summaryNutrition)
    // console.log(this.summaryNutrition);
  }

  // child component nutrition-panel deletes a food and emit an event to tracker-home component
  onFoodDeleted(foodItem: FoodItem) {
    console.log(this.foodSelected.splice(this.foodSelected.indexOf(foodItem), 1));
    this.summaryNutrition = removeFoodNutritionFromSummary(foodItem, this.summaryNutrition)
  }
}
