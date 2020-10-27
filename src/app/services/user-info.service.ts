import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserInfoBE } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  // TODO(minalong): update local host to REST API url
  baseUrl = 'http://localhost:8080/userrecord';

  constructor(private httpClient: HttpClient) { }

  // Get a list of user records given a date and a userId
  public getUserInfo(date: string, userId: string) {
    return this.httpClient.get<UserInfoBE[]>(this.baseUrl, {
      params: {
        date: date,
        userId: userId
      }
    });
  }

  // Submit userinfo to BE
  public submitUserInfo(list: UserInfoBE[]) {
    return this.httpClient.post(this.baseUrl, list);
  }
}
