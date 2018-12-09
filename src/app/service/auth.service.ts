import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/';
import { Router } from '@angular/router';
import { resolve, reject } from 'q';
import { FacebookLoginProvider, SocialUser } from "angular5-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private user: Observable<firebase.User>;
  loggedInStatus: boolean = false;
  userdetails:string;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router /*private notifier: NotificationService*/) {
    this.user = _firebaseAuth.authState;
    firebase.firestore().settings( { timestampsInSnapshots: true })
    
  }

  signup(email: string, password: string) {
    // clear all messages
    //this.notifier.display(false, '');
    this._firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
       // this.loggedInStatus = true;
        this.router.navigate(['login']);
        this.sendEmailVerification();
        const message = 'A verification email has been sent, please check your email and follow the steps!';
       // this.notifier.display(true, message)
       
        //firebase.database().ref('Employees/' + name).set({
         
          // The .ref automatically puts u in the realtime database section you created
          // You as the coder instantiates a new table column and .set the table row data
         
        //})
      })
      .catch(err => {
        console.log(err);
        this.router.navigate(['signup'])
       // this.notifier.display(true, err.message);
      });
  }
  sendEmailVerification() {
    this._firebaseAuth.authState.subscribe(user => {
      user.sendEmailVerification()
      .then(() => {
        console.log('email sent');
      })
    
    
    });
   
  }
  doLogin(email:string,password:string){
    console.log(firebase.auth().currentUser.displayName)
    
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(res => {
       if(res.user.emailVerified){
        resolve(res);
        this.loggedInStatus = true;
        firebase.database().ref('Employees/' + name).set({
          email:password,
          name:res.user.displayName,
          uid:res.user.uid
         
          // The .ref automatically puts u in the realtime database section you created
          // You as the coder instantiates a new table column and .set the table row data
         
        })
        
       }
       else{
         console.log("Not Verified")
         this.loggedInStatus=false;
         reject();
       }
      }, err => reject(err))
    })
  }
  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this._firebaseAuth.auth.signOut()
       // this.router.navigate(['home'])
        resolve();
      }
      else{
        reject();
      }
      this.loggedInStatus = false;

    });
  }

  /* isLoggedIn():boolean {
      return this.loggedInStatus;
  } */
  doGoogleLogin(){
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      let provider =  new firebase.auth.GoogleAuthProvider();
      provider.addScope['email']
      provider.addScope['profile']

      console.log(provider.addScope('email'))
    
      this._firebaseAuth.auth.signInWithPopup(provider).then(result=>{
        
        firebase.firestore().collection("/USERS").add({
          email:result.user.email,
          name:result.user.displayName
          // The .ref automatically puts u in the realtime database section you created
          // You as the coder instantiates a new table column and .set the table row data
         
        })
        this.loggedInStatus = true;
        resolve(result)
      }).catch(err=> {console.log(err); reject()})
    //  this._firebaseAuth.auth.getRedirectResult().then(result=>{console.log(result.user.email)})

    })
  }
  doFacebookLogin(){
    return new Promise<SocialUser>((resolve,reject)=>{
     
      let details = new FacebookLoginProvider("368802260542654")
    let facebookprovider = new firebase.auth.FacebookAuthProvider()
      this._firebaseAuth.auth.signInWithPopup(facebookprovider).then(data=>{
        details.initialize().then(user=> {
          console.log(user)
          firebase.firestore().collection("/USERS").add({
            name:user.name,
            email:user.email==null ? "No email" : user.email
          })
          this.loggedInStatus = true;
          resolve(user)
        }).catch(err => {console.log(err); reject()})
      })
      
    
 })
  }
  CheckLoggedIn():boolean{
    if (this.loggedInStatus == true) {
      return true;
    } else {
      return false;
    }
  }
}
