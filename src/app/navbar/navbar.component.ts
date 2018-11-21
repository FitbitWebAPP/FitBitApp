import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private myRoute: Router) { }

  ngOnInit() {
  }

  Logout(){

    // this._AuthGuard.signOut();
    // or
    // this.auth.doLogout();
    
    this.myRoute.navigate(["login"]);
  }

}
