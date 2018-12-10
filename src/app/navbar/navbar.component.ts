import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private myRoute: Router, private authservice:AuthService) { }

  ngOnInit() {
  }
  userLoggedIn():boolean{
      return this.authservice.CheckLoggedIn()
  }

  Logout(){

    
    this.authservice.doLogout();
    this.myRoute.navigate(["login"]);
  }

}
