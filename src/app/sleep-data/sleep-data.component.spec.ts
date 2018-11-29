import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepDataComponent } from './sleep-data.component';

describe('SleepDataComponent', () => {
  let component: SleepDataComponent;
  let fixture: ComponentFixture<SleepDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
