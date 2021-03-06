import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/';
import { Router, ActivatedRoute } from '@angular/router';
import { resolve, reject } from 'q';
import { FacebookLoginProvider, SocialUser } from "angular5-social-login";
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private user: Observable<firebase.User>;
  loggedInStatus: boolean = false;
  userdetails:string;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, @Inject(DOCUMENT) private document: any) {
    this.user = _firebaseAuth.authState;
    firebase.firestore().settings( { timestampsInSnapshots: true })
    
  }

  signup(email: string, password: string, name:string) {
    // clear all messages
    //this.notifier.display(false, '');
    this._firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
       // this.loggedInStatus = true;
        //setTimeout(() => this.document.location.href = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22D5C5&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback&scope=activity%20heartrate%20nutrition%20profile%20sleep%20social%20weight&expires_in=604800', 2000);
        this.router.navigate(['login', {p1:email}], {skipLocationChange:true});
        this.sendEmailVerification();
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
    console.log(email)
    
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(res => {
       if(res.user.emailVerified){
        resolve(res);
        this.loggedInStatus = true;
        firebase.firestore().collection("/USERS").add({
          email:password,
          name:res.user.displayName,
          uid:res.user.uid 
         
          // The .ref automatically puts u in the realtime database section you created
          // You as the coder instantiates a new table column and .set the table row data
         
        })
        localStorage.setItem("user", res.user.uid)
      console.log("LOOK HERE ",localStorage.getItem('user'))
        this.document.location.href = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22D5C5&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback&scope=activity%20heartrate%20nutrition%20profile%20sleep%20social%20weight&expires_in=604800';
          //this.router.navigate(['group-list'])
          // The .ref automatically puts u in the realtime database section you created
          // You as the coder instantiates a new table column and .set the table row data
         
        
        
       }
       else{
         alert("Not Verified Email")
         this.loggedInStatus=false;
         reject();
       }
      }, err => reject(err))
    })
    
  }
  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this._firebaseAuth.auth.signOut()                                                             ///////////////////////////////////////////////////////////////////////////////////////////
        this.loggedInStatus = false;
        this.router.navigate(['signup'])
        
        resolve();
      }
      else{
        reject();
      }
      localStorage.removeItem('user')
      this.loggedInStatus = false;

    });
  }

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
        this.router.navigate(['login', {p1:result.user.email}], {skipLocationChange:true});
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
          this.router.navigate(['login', {p1:user.email}], {skipLocationChange:true});
          resolve(user)
        }).catch(err => {console.log(err); reject()})
      })
      
    
 })
  }
  CheckLoggedIn():boolean{
    if (this.loggedInStatus == true || localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  //adds the fitbit user id from the profile endpoint to the user's document after they sign up and log into fitbit
  addFitbitUserID(fitbitId){
      console.log(firebase.auth().currentUser.uid);
      console.log(fitbitId);
      firebase.firestore().collection("/USERS").doc(firebase.auth().currentUser.uid)
      .update("fitbitId", fitbitId);
  }
}
