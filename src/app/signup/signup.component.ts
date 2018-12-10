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
  name: string;
  facebookCred:string;

  constructor( private _authservice:AuthService) { 
    
  }

  ngOnInit() {
  }

  Register() {
   // console.log("Face user "+ this.facebookCred)

    this._authservice.signup(this.email,this.password, this.name);
    console.log(this.email);
    console.log(this.password);

  }
  GoogleLogin(){
    this._authservice.doGoogleLogin().then(ere=>{
      this.facebookCred=ere.user.displayName
      console.log("Face user from then block "+ this.facebookCred)
    })
   // console.log(this.facebookCred)
  }
  FacebookLogin(){
    this._authservice.doFacebookLogin().then(ere=>{
      this.facebookCred=ere.name
      console.log("Face user from then block "+ this.facebookCred)
    })
  }

}

// fitbitapp-97ab1.firebaseapp.com
// WEBSITE FOR APP^^