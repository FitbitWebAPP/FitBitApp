import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  profile;
  errorMessage: string;

  constructor(private _authservice:AuthService, private _fitbit: ApiService, private myRoute: Router) { }

  //here, the user's profile id is acquired through the profile endpoint and added to their document in the firestore
  ngOnInit() {
    this._fitbit.getFitbitProfile().subscribe(data => { this.profile = data as IUserResponse,error => this.errorMessage = <any>error});
    setTimeout(() => console.log(this.profile.user.encodedId), 5000);
    setTimeout(() => this._authservice.addFitbitUserID(this.profile.user.encodedId), 1000);
    setTimeout(() => this.myRoute.navigate(["group-list"]), 2000);
  }

}
