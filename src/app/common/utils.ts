import { ExistingProvider } from '@angular/core';
import { FoodItem } from './constants';

/* Class for utility functions */

// get food name from food display name
// e.g.: Beef, 100g => Beef
export function parseFoodDisplayNameToFoodName(foodDisplayName: string) {
    return foodDisplayName.split(',')[0].trim();
}

// get sizePerServing from food display name
// e.g.: Beef, 100g => 100g
export function parseFoodDisplayNameToSize(foodDisplayName: string) {
    return foodDisplayName.split(',')[1].trim();
}

// get FoodItem object based on food name and size
// e.g.: Beef & 100g & FoodItem[] => FoodItem {foodname:xx, foodid:xx ...}
export function getFoodItemObject(foodname: string, foodSize: string, list: FoodItem[]): FoodItem {
    return list.find(item => item.foodName === foodname && item.sizePerServing === foodSize);
}

// add new food item's nutrition to existing summary
// e.g.: {calories: 100, protein: 20...}, {calories: 200, protein: 40...} => {calories: 300, pritein 60...}
export function addFoodNutritionToSummary(newFood: FoodItem, existingNutrition: FoodItem): FoodItem {
    let res = <FoodItem>{};
    for (let key in existingNutrition) {
        if (key === 'foodId' || key === 'foodName' || key === 'sizePerServing') {
            continue;
        }
        res[key] = existingNutrition[key] + newFood[key];
    }
    return res;
}

// remove food item's nutrition to existing summary
// e.g.: {calories: 100, protein: 20...}, {calories: 200, protein: 40...} => {calories: 100, pritein 20...}
export function removeFoodNutritionFromSummary(newFood: FoodItem, existingNutrition: FoodItem): FoodItem {
    let res = <FoodItem>{};
    for (let key in existingNutrition) {
        if (key === 'foodId' || key === 'foodName' || key === 'sizePerServing') {
            continue;
        }
        res[key] = existingNutrition[key] - newFood[key];
    }
    return res
};
