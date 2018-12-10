import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import * as firebase from 'firebase/';
import { IDatabaseUser } from '../shared/databaseuser.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  users;

  constructor(private _afs: AngularFirestore) { }

    getUsers(): Observable<IDatabaseUser[]>{
      this.users=this._afs.collection<IDatabaseUser>("USERS").snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as IDatabaseUser;
          console.log("data: ", JSON.stringify(data));
          return {data};
        }))
      );
      return this.users;
    }
}
