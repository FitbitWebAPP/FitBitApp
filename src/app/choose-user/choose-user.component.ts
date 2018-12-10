import { Component, OnInit, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from '../service/database.service';
import { ApiService } from '../shared/api.service';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-choose-user',
  templateUrl: './choose-user.component.html',
  styleUrls: ['./choose-user.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChooseUserComponent),
      multi: true
    }
]
})
export class ChooseUserComponent implements OnInit {

  users;
  errorMessage: string;
  chosenUser;
  displayOtherUsersDataBool: boolean;

  constructor(private _databaseService: DatabaseService, private _fitbit: ApiService) { }

  ngOnInit() {
    this._databaseService.getUsers().subscribe(users =>{
      this.users = users;
    },
    error => this.errorMessage = <any>error);
    setTimeout(() => console.log(this.users), 3000);
  }

  chooseUser(fitbitId){
    console.log(fitbitId);
    this._fitbit.chooseUser(fitbitId);
  }

  displayOtherUsersData(){
    this.displayOtherUsersDataBool = !this.displayOtherUsersDataBool;
    console.log("clicked: " + this.displayOtherUsersDataBool);
    return false;
  }
}
