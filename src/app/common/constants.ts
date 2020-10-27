// FoodItem object we use in the FE
export interface FoodItem {
    foodId: string,
    foodName: string,
    sizePerServing: string,
    foodCalorie: number,
    foodCarb: number,
    foodProtein: number,
    foodQuantity?: number,
}

// Function to create a new object of FoodItem interface type
export const createFoodItem = (id: string, name: string, size: string,
    calories: number, carb: number, protein: number, quantity?: number): FoodItem => ({
        foodId: id,
        foodName: name,
        sizePerServing: size,
        foodCalorie: calories,
        foodCarb: carb,
        foodProtein: protein,
        foodQuantity: quantity,
    });

// FoodInfo class received from BE in FoodService
export interface FoodInfoBE {
    foodId: number,
    nutritionId: number,
    foodDescription: string,
    servingSize: string,
    nutritionName: string,
    nutritionAmount: number,
}

// An FoodItem object with properties as empty or default
export const emptyFoodItem: FoodItem =
{
    foodId: '',
    foodName: '',
    sizePerServing: '',
    foodCalorie: 0,
    foodCarb: 0,
    foodProtein: 0,
    foodQuantity: 0,
};

// nutritions the frontend will show to users
export enum NutritionsToShow {
    'foodCalorie' = 'Calories',
    'foodCarb' = 'Carbs',
    'foodProtein' = 'Protein',
}

// UserInfo received from the BE
export interface UserInfoBE {
    recordId: number,
    foodId: number,
    quantity: number,
    userId: string,
    recordDate: string,
}

// Function to create a new object of UserInfoBE interface type
export const createUserInfo = (foodItem: FoodItem, userId: string, date: string): UserInfoBE => ({
    recordId: 0,
    foodId: parseInt(foodItem.foodId),
    quantity: foodItem.foodQuantity,
    userId: userId,
    recordDate: date,
});