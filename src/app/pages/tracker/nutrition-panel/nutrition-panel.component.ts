import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodItem, NutritionsToShow } from 'src/app/common/constants';

@Component({
  selector: 'app-nutrition-panel',
  templateUrl: './nutrition-panel.component.html',
  styleUrls: ['./nutrition-panel.component.css']
})
export class NutritionPanelComponent implements OnInit {

  @Input() foodList: FoodItem[] = []; // emitted property from parent tracker-home
  @Input() foodSummary: FoodItem;  // tracker home component calculates the summary
  @Output() onFoodDeletion = new EventEmitter<FoodItem>();
  @Output() onQuantityChange = new EventEmitter<{ foodId: string, newQuantity: number }>(); // emit object

  // ['foodCalorie','foodCarb','foodProtein'...]
  nutritionEnumKeys = Object.keys(NutritionsToShow);

  constructor() { }

  ngOnInit(): void {
  }

  // Covert nutrition type from backend data to FE display using enum
  getEnumValue(key: string) {
    return NutritionsToShow[key];
  }

  deleteFoodItem(foodItem: FoodItem) {
    this.onFoodDeletion.emit(foodItem);
  }

  updateQuantity(foodItem: FoodItem, value: number) {
    this.onQuantityChange.emit({ foodId: foodItem.foodId, newQuantity: value });
  }

  displayNumber(num: number) {
    return Math.round(num * 10) / 10;
  }

}
