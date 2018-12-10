import { Component, AfterContentInit, AfterViewInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Keepalive} from '@ng-idle/keepalive';
import { AuthService } from './service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fitbit';
  constructor(
    private maticonregistry:MatIconRegistry, 
    private domsanitizer:DomSanitizer,
    private idle:Idle,
    private route:Router,
    private serv:AuthService
    ) {
    this.IdleTimeoutCheck();
    this.maticonregistry.addSvgIcon("icons8-facebook", this.domsanitizer.bypassSecurityTrustResourceUrl("../../assets/icons8-facebook.svg"))
    this.maticonregistry.addSvgIcon("icons8-google", this.domsanitizer.bypassSecurityTrustResourceUrl("../../assets/icons8-google.svg"))
    //this.startingroute.navigate(['group-list'])
   
  }
  IdleTimeoutCheck(){
    this.idle.setIdle(5)       // WILL LOGOUT AUTOMATICALLY AFTER 30 MINS OF INACTIVITY..
    this.idle.setTimeout(5)
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout.subscribe(() => {
        console.log('Timed out!');
        this.serv.doLogout();
       this.route.navigate(['login'])
    });
    this.idle.watch();
  }
   
  
}
