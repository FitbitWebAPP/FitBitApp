import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { FitbitAppComponent } from './fitbit-app/fitbit-app.component';
import { ComparisonDataComponent } from './comparison-data/comparison-data.component';
import { SleepDataComponent } from './sleep-data/sleep-data.component';
import { ActivityDataComponent } from './activity-data/activity-data.component';
import { HeartrateDataComponent } from './heartrate-data/heartrate-data.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    GroupListComponent,
    AddGroupComponent,
    FitbitAppComponent,
    ComparisonDataComponent,
    SleepDataComponent,
    ActivityDataComponent,
    HeartrateDataComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {path: "", component: AppComponent},
        {path: "login", component: LoginComponent},
        {path: "signup", component: SignupComponent},
        {path: "group-list", component: GroupListComponent},
        {path: "add-group", component: AddGroupComponent},
        {path: "group", component: GroupComponent}
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
