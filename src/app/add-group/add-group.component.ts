import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from '../IGroup';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  // In this component we can add a group into the connected database
  // Each group has a Id, name and description

  groupID: number;
  groupName: string;
  groupDescription: string;
  //groupUsers: string;

  listFilter: string;

  constructor(private _groupService: GroupService, private router: Router) { }

  ngOnInit() {
  }

  addGroup(): void {
    let Group: IGroup = {
      groupID: this.groupID,
      groupName: this.groupName,
      groupDescription: this.groupDescription,
      //groupUsers: this.groupUsers
    };
    // This addGroup method from the group service adds the group into the
    // database into the Group collection
    this._groupService.addGroup(Group);
    // redirect to the group-list component after the group has been created
    this.router.navigate(['/group-list']);
  }

}
