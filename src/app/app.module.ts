import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { environment } from 'src/environments/environment.prod';
import {AuthGuard} from './service/auth.guard';
import { AuthService } from './service/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
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
import {MatButtonModule} from '@angular/material/button'
import { MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule,MatIconModule, MatListModule, MatProgressSpinnerModule, MatOptionModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SocialLoginModule, AuthServiceConfig } from "angular5-social-login";
import { FacebookLoginProvider } from "angular5-social-login";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { OtherUsersDataComponent } from './other-users-data/other-users-data.component';
import { ChooseUserComponent } from './choose-user/choose-user.component';
import { CallbackComponent } from './callback/callback.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

 export function getAuthServiceConfigs() 
{
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("368802260542654")
    }
  ]);
  return config
}

const routes: Routes = [
  {path: '', redirectTo: 'group-list', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'group-list', component: GroupListComponent},
  {path: 'add-group', component: AddGroupComponent, canActivate:[AuthGuard]},
  {path: 'group', component: GroupComponent, canActivate:[AuthGuard]},
  {path: 'activity-data', component: ActivityDataComponent, canActivate:[AuthGuard]},
  {path: 'comparison-data', component: ComparisonDataComponent, canActivate:[AuthGuard]},
  {path: 'callback', component: CallbackComponent},
  {path: 'heartrate-data', component: HeartrateDataComponent, canActivate:[AuthGuard]},
  {path: 'sleep-data', component: SleepDataComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: 'login'}
]

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
    LoginComponent,
    OtherUsersDataComponent,
    ChooseUserComponent,
    CallbackComponent
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.Firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    NgxChartsModule,
    NgIdleKeepaliveModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService,AuthGuard,
     {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs()
    } 
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
