import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../service/auth.service'
import { from } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  email: string;
  password: string;

  constructor(private myRoute: Router, private _authservice:AuthService) { }

  ngOnInit() {
  }

  Register() {
    this._authservice.signup(this.email,this.password)
    console.log(this.email);
    console.log(this.password);
  }

}
