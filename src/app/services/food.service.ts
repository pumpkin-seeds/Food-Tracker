import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  // TODO(minalong): update local host to REST API url
  baseUrl = 'http://localhost:8080/food';

  constructor(private httpClient: HttpClient) { }

  // Get a list of Food items nutritions by giving the food id
  public getFoodListById(id: number) {
    return this.httpClient.get(this.baseUrl, {
      params: {
        id: id.toString(),
      }
    })
  }

  // Search and return a list of Food items by giving the food name
  public searchFoodListByName(name: string) {
    return this.httpClient.get(this.baseUrl, {
      params: {
        name: name,
      }
    })
  }
}
