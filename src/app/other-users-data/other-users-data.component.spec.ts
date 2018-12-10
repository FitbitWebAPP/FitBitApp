import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUsersDataComponent } from './other-users-data.component';

describe('OtherUsersDataComponent', () => {
  let component: OtherUsersDataComponent;
  let fixture: ComponentFixture<OtherUsersDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherUsersDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUsersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
