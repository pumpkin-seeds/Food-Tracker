import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createFoodItem, FoodInfoBE, FoodItem } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  // TODO(minalong): update local host to REST API url
  baseUrl = 'http://localhost:8080/food';

  constructor(private httpClient: HttpClient) { }

  // Get a list of Food items nutritions by giving the food id
  public getFoodItemById(id: string, quantity?: number) {
    return this.httpClient.get<FoodInfoBE[]>(this.baseUrl, {
      params: {
        id: id,
      }
    }).pipe(
      // map(res => {
      //   console.log(res);
      //   return res;
      // }),
      map(res => {
        if (res.length === 0) {
          return;
        }
        let calories = 0;
        let carb = 0;
        let protein = 0;
        res.forEach(element => {
          if (element.nutritionId === 1003) {
            // 1003 Protein
            protein = element.nutritionAmount;
          } else if (element.nutritionId === 1005) {
            // 1005 carbs
            carb = element.nutritionAmount;
          } else if (element.nutritionId === 1008) {
            // 1008 calories
            calories = element.nutritionAmount;
          } 
        });
        return createFoodItem(res[0].foodId.toString(), res[0].foodDescription,
          res[0].servingSize, calories, carb, protein, quantity ? quantity : 1);
      })
    )
  }

  // Search and return a list of Food items by giving the food name
  public searchFoodListByName(name: string): Observable<FoodItem[]> {
    return this.httpClient.get<FoodInfoBE[]>(this.baseUrl, {
      params: {
        name: name,
      }
    })
      .pipe(
        map(response => {
          let foodIdSet = new Set<number>();
          return response.
            map((item: FoodInfoBE) => { // Since the json is a list, we need two maps
              if (foodIdSet.has(item.foodId)) {
                return;
              }
              foodIdSet.add(item.foodId);
              return createFoodItem(item.foodId.toString(), item.foodDescription, item.servingSize,
                0, 0, 0, 0); // Setting nutritions values to zeros
            })
        }),
        // Use filter to remove duplicated FoodItem items with the same food names
        map(res => res.filter((item: FoodItem) => item !== undefined)),
        // map(res => {
        //   console.log(res)
        //   return res;
        // }),
      );
  };

}