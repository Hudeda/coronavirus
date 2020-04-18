import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GratitudeStepComponent } from './gratitude-step.component';

describe('GratitudeStepComponent', () => {
  let component: GratitudeStepComponent;
  let fixture: ComponentFixture<GratitudeStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GratitudeStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GratitudeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
