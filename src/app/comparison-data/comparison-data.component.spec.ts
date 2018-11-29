import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonDataComponent } from './comparison-data.component';

describe('ComparisonDataComponent', () => {
  let component: ComparisonDataComponent;
  let fixture: ComponentFixture<ComparisonDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
