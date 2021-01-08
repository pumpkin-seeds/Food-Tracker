import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodInfoBE } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {

  // TODO(minalong): update local host to REST API url
  baseUrl = 'http://localhost:8080/userpreference';

  constructor(private httpClient: HttpClient) { }

  // Get a list of top n user preferred food given a userId and an integer n
  public getUserPreferredFood(userId: string, topN: number) {
    return this.httpClient.get<FoodInfoBE[]>(this.baseUrl, {
      params: {
        userId: userId,
        topN: topN.toString()
      }
    });
  }
}
