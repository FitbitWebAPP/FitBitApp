import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from  "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private fitbitUrl = "https://api.fitbit.com/1/user/"
  private activitiesEndpoint = "/activities/date/today.json";
  //putting "-" in the fitbit endpoint for the user param gets the user who is currently logged in
  //therefore I default it to "-"
  user = "-";
  authUrl: string;
  private authToken;
  private profileEndpoint = "/profile.json";
  activityData: Observable<IFitbitResponse>;

  constructor(private _http: HttpClient) { }

  //this method gets the token used in the api's oauth flow - uses client side, not server
  //there is an option to use server authentication, but I opted for client for this app
  getToken(){
    //this.authUrl = window.location.hash.replace("#access_token=", "");
    if(window.location.hash.includes("#access_token"))
    {
      this.authToken = window.location.hash.replace("#access_token=", "");
      console.log("url: ", this.authToken);
      this.authToken = this.authToken.split("&");
      console.log("token: ", this.authToken);
      localStorage.setItem('authToken', this.authToken[0]);
      console.log("local token: ", localStorage.getItem('authToken'));
    }
    //this.authToken = window.location.hash.replace("#access_token=", "");
    /*console.log(this.authUrl);
    if (this.authUrl != null || this.authUrl != "" || this.authUrl != undefined)
    { 
      this.authToken = this.authUrl.split("&");
    }*/
    /*localStorage.setItem('authToken', this.authToken[0]);
    console.log("local token: ", localStorage.getItem('authToken'));*/
    return this.authToken[0];
  }

  //the headers required are just the auth token
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`,
  });

  private localHeaders = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });

  //method for changing the user to compare to
  chooseUser(chosenUser){
    if(chosenUser != undefined)
    {
      this.user = chosenUser;
      console.log(this.user);
    }
  }

  //gets the user's activity data, such as heartrate, steps taken and calories burned
  getFitbitData(): Observable<IFitbitResponse>{
    console.log(this.headers);
    return this._http.get<IFitbitResponse>(this.fitbitUrl + this.user + this.activitiesEndpoint, {headers:this.localHeaders})
    .pipe(map(res => res));
  }

  //this gets the user's profile data. This is used for getting the user's id
  //which can be inserted into the activity data endpoint to get other user's data
  getFitbitProfile(): Observable<IUserResponse>{
    return this._http.get<IUserResponse>(this.fitbitUrl + this.user + this.profileEndpoint, {headers:this.headers})
    .pipe(map(res => res));
  }
}
