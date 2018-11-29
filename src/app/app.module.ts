import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { environment } from 'src/environments/environment.prod';
import {AuthGuard} from './service/auth.guard';
import { AuthService } from './service/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
=======
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
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'group-list', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'group-list', component: GroupListComponent},
  {path: 'add-group', component: AddGroupComponent},
  {path: 'group', component: GroupComponent},
  {path: 'activity-data', component: ActivityDataComponent},
  {path: 'comparison-data', component: ComparisonDataComponent},
  {path: 'heartrate-data', component: HeartrateDataComponent},
  {path: 'sleep-data', component: SleepDataComponent},
  {path: '**', redirectTo: 'login'}
]
>>>>>>> 1b0e124e58091cc8343a80ac040c2f533ec317f6

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
<<<<<<< HEAD
    AngularFireModule.initializeApp(environment.Firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
=======
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
>>>>>>> 1b0e124e58091cc8343a80ac040c2f533ec317f6
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
