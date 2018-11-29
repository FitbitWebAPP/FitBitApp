import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;

  constructor(private myRoute: Router) { }

  ngOnInit() {
  }

  Register() {

    console.log(this.email);
    console.log(this.password);
  }

}
