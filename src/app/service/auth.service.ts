import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  loggedInStatus: boolean = false;
  userdetails:string;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router /*private notifier: NotificationService*/) {
    this.user = _firebaseAuth.authState;
    
  }

  signup(email: string, password: string) {
    // clear all messages
    //this.notifier.display(false, '');
    this._firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
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
    console.log(firebase.auth().currentUser.email)
    
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(res => {
       if(res.user.emailVerified){
        resolve(res);
        //this.loggedInStatus = true;
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
    return new Promise<any>((resolve, reject) => {
      let provider =  new firebase.auth.GoogleAuthProvider();
      provider.addScope['email']
      provider.addScope['profile']

      console.log(provider.addScope('email'))
    
      this._firebaseAuth.auth.signInWithPopup(provider).then(result=>{
        alert(result.user.email)
        this.router.navigate(['login'])
        firebase.database().ref('Users/').set({
          email:result.user.email
          // The .ref automatically puts u in the realtime database section you created
          // You as the coder instantiates a new table column and .set the table row data
         
        })
      })
    //  this._firebaseAuth.auth.getRedirectResult().then(result=>{console.log(result.user.email)})

    })
  }
  doFacebookLogin(){
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope['email']
    provider.addScope['profile']
    this._firebaseAuth.auth.signInWithPopup(provider).then(result=>{
      alert(result.user.email)
      firebase.database().ref('Users/').set({
        email:result.user.email
        // The .ref automatically puts u in the realtime database section you created
        // You as the coder instantiates a new table column and .set the table row data
       
      }).catch(err=> alert(err))
    })
  }
}
