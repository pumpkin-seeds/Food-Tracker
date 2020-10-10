export interface FoodItem {
    foodId: string,
    foodName: string,
    sizePerServing: string,
    foodCalorie: number,
    foodCarb: number,
    foodProtein: number,
}

// TODO(minalong): Pretend this is the list we get from the backend
// weight (mass): oz / grams; 1oz = 30 grams
// volumn (liquid): tbsp, tsp, cup / ml; 1 cup = 237 ml
export const foodList: FoodItem[] = [
    {
        foodId: '0001',
        foodName: 'Apple',
        sizePerServing: '100g',
        foodCalorie: 52,
        foodCarb: 14,
        foodProtein: 0.3,
    },
    {
        foodId: '0002',
        foodName: 'Straberry',
        sizePerServing: '100g',
        foodCalorie: 32,
        foodCarb: 7.7,
        foodProtein: 0.7,
    },
    {
        foodId: '0003',
        foodName: 'Beef',
        sizePerServing: '100g',
        foodCalorie: 198,
        foodCarb: 0,
        foodProtein: 19,
    },
    {
        foodId: '0004',
        foodName: 'Chicken Breast',
        sizePerServing: '100g',
        foodCalorie: 134,
        foodCarb: 1.8,
        foodProtein: 15,
    },
    {
        foodId: '0005',
        foodName: 'Whole Fat Milk',
        sizePerServing: '100ml',
        foodCalorie: 62,
        foodCarb: 4.9,
        foodProtein: 3.2,
    },
    {
        foodId: '0006',
        foodName: 'Whole Fat Milk',
        sizePerServing: '1cup',
        foodCalorie: 152,
        foodCarb: 12,
        foodProtein: 7.9,
    },
    {
        foodId: '0007',
        foodName: 'Cheesecake',
        sizePerServing: '100g',
        foodCalorie: 339,
        foodCarb: 44,
        foodProtein: 7,
    },
    {
        foodId: '0008',
        foodName: 'Cheesecake',
        sizePerServing: '1oz',
        foodCalorie: 91,
        foodCarb: 7.2,
        foodProtein: 1.6,
    },
]