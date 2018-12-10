import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { IGroup } from '../IGroup';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  group: IGroup;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.getGroup();
  }

  getGroup(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe(group => this.group = group);
  }

  goBack(): void {
    // this.location.back();
    // or
    this.router.navigate(['group-list']);
  }

}
