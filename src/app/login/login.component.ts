import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../service/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
SignupemailCopy:string;


  
  constructor(private authservice:AuthService, private activeRoute:ActivatedRoute) {
    this.SignupemailCopy = this.activeRoute.snapshot.params['p1']
   
   }

  ngOnInit() {
  }

  login(Email:string, Password:string) {
    this.authservice.doLogin(Email, Password)
    
  }

}
