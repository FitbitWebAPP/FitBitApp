import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { tap, map } from  "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private endpoint = "https://api.fitbit.com/1/user/-/activities/date/today.json";
  private authToken;
  activityData: Observable<IFitbitResponse>;

  constructor(private _http: HttpClient) { }

  getToken(){
    this.authToken = window.location.hash.replace("#access_token=", "");
    this.authToken = this.authToken.split("&");
    console.log(this.authToken[0]);

    return this.authToken[0];
  }

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`,
  });

  getFitbitData(): Observable<IFitbitResponse>{
    return this._http.get<IFitbitResponse>(this.endpoint, {headers:this.headers})
    .pipe(tap());
  }
}
