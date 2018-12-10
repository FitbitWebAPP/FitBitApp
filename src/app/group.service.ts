import { Injectable } from '@angular/core';
import { IGroup } from './IGroup';
import { Observable, of } from 'rxjs';

import {catchError, tap, map} from 'rxjs/operators';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  GroupCollection: AngularFirestoreCollection<IGroup>;
  Group: Observable<IGroup[]>
  userId: string;

  // Group array to hold all groups
  allGroups: IGroup[];

  constructor(private _http: HttpClient, private _afs: AngularFirestore, private _firebaseAuth: AngularFireAuth) { 
    // Connect to the database
    this.GroupCollection = _afs.collection<IGroup>("Group");

  }

  getGroups(): Observable<IGroup[]> {
    // valueChanges() returns the current state of the collection as an
    // Observable of data as a synchronized array of JSON objects

    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change.

    // This method retrieves the information about each group when the
    // group-list page is loaded, we can see this in the console log
    this.Group = this.GroupCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IGroup;
        console.log("getGroups:data" + JSON.stringify(data));
        const id = a.payload.doc.id;
        console.log("getGroups:id = "+id);
        return { id, ...data };
      }))
    );
    return this.Group;
  }

  addGroup(group: IGroup) {
     this.GroupCollection.add(group);  
        
  }

  getGroup(id: number | string) {
      console.log(this._http.get<IGroup>(this.Group + '/' + id))
      return this._http.get<IGroup>(this.Group + '/' + id);

      /*
      return this.getGroups().pipe(
        // (+) before 'id' turns the string into a number
        map((groups: IGroup[]) => groups.find(Group => Group.groupId === +id))
      );
      */
  }

  /*
  join(groupKey) {
    const data = { [this.userId]: true}
    const members = this.GroupCollection.doc(`Group/${groupKey}/groupMembers`)
    members.update(data)
  }
  
  leave(groupKey) {
    const member = this.GroupCollection.doc(`Group/${groupKey}/groupMembers/${this.userId}`)
    member.delete()
  }
  */
//}
}

