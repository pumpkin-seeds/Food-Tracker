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

// get FoodItem object based on food id
// e.g.: Beef & 100g & FoodItem[] => FoodItem {foodname:xx, foodid:xx ...}
export function getFoodItemObjectFromId(foodid: string, list: FoodItem[]): FoodItem {
    return list.find(item => item.foodId === foodid);
}

// get FoodItem object based on food id
// e.g.: 0001 & FoodItem[] => FoodItem {foodname:xx, foodid:xx ...}
export function getFoodItemObjectFromID(foodId: string, list: FoodItem[]): FoodItem {
    return list.find(item => item.foodId === foodId);
}

// add new food item's nutrition to existing summary
// e.g.: {calories: 100, protein: 20...}, {calories: 200, protein: 40...} => {calories: 300, pritein 60...}
export function addFoodNutritionToSummary(newFood: FoodItem, existingNutrition: FoodItem): FoodItem {
    let res = <FoodItem>{};
    for (let key in existingNutrition) {
        if (typeof newFood[key] === 'number') {
            res[key] = roundToOne((existingNutrition[key] + newFood[key]));
        }
    }
    return res;
}

// remove food item's nutrition to existing summary
// e.g.: {calories: 100, protein: 20...}, {calories: 200, protein: 40...} => {calories: 100, pritein 20...}
export function removeFoodNutritionFromSummary(newFood: FoodItem, existingNutrition: FoodItem): FoodItem {
    let res = <FoodItem>{};
    for (let key in existingNutrition) {
        if (typeof newFood[key] === 'number') {
            res[key] = roundToOne((existingNutrition[key] - newFood[key]));
        }
    }
    return res
};


// update existing summary due to food quantity change
// e.g.: {calories: 100, protein: 20...}, {calories: 200, protein: 40...} => {calories: 300, pritein 60...}
export function updateFoodNutritionToSummary(foodItem: FoodItem,
    oldQuantity: number, newQuantity: number, existingNutrition: FoodItem): FoodItem {
    let res = <FoodItem>{};
    for (let key in existingNutrition) {
        if (typeof foodItem[key] === 'number') {
            res[key] = roundToOne((existingNutrition[key] + foodItem[key] * (newQuantity - oldQuantity)));
        }
    }
    return res;
}

// round to one decimal place
function roundToOne(number: number) {
    return Math.round(number * 10) / 10;
}
