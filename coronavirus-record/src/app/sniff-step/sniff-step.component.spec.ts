import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SniffStepComponent } from './sniff-step.component';

describe('SniffStepComponent', () => {
  let component: SniffStepComponent;
  let fixture: ComponentFixture<SniffStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SniffStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SniffStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
