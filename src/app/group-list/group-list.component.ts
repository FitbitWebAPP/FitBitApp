import { Component, OnInit } from '@angular/core';
import { IGroup } from '../IGroup';
import { GroupService } from '../group.service';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { group } from '@angular/animations';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  // This component is used for displaying all the groups that habe been
  // created, 

  private user: Observable<firebase.User>;
  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredGroups = this.listFilter ? this.performFilter(this.listFilter) : this.Group;
  }

  filteredGroups: IGroup[];
  Group: IGroup[];

  constructor(private _groupService: GroupService, private router: Router) { 
    this.filteredGroups = this.Group;
  }

  performFilter(filterBy:string):IGroup[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.Group.filter((group:IGroup)=> group.groupName.toLocaleLowerCase().indexOf(filterBy) != -1);
  }

  public ngOnInit(): void {
      this._groupService.getGroups().subscribe(Group => {
        this.Group = Group,
        this.filteredGroups = this.Group;
      });
  }

  joinGroup() {
   
  }

  viewGroup(selectedGroup: IGroup) {
    console.log("Id: "+selectedGroup.groupID+", Name: "+selectedGroup.groupName+", Description: "+selectedGroup.groupDescription)
    this.router.navigate(['group', {p1:selectedGroup.groupID, p2:selectedGroup.groupName, p3:selectedGroup.groupDescription}], {skipLocationChange:true});
  }

  
}