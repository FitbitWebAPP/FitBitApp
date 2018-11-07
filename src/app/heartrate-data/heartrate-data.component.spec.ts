import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartrateDataComponent } from './heartrate-data.component';

describe('HeartrateDataComponent', () => {
  let component: HeartrateDataComponent;
  let fixture: ComponentFixture<HeartrateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartrateDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartrateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
