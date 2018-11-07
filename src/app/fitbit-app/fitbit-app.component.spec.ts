import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitbitAppComponent } from './fitbit-app.component';

describe('FitbitAppComponent', () => {
  let component: FitbitAppComponent;
  let fixture: ComponentFixture<FitbitAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitbitAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitbitAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
