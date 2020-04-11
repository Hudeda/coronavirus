import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoughStepComponent } from './cough-step.component';

describe('CoughStepComponent', () => {
  let component: CoughStepComponent;
  let fixture: ComponentFixture<CoughStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoughStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoughStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
