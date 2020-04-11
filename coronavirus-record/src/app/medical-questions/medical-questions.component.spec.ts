import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalQuestionsComponent } from './medical-questions.component';

describe('MedicalQuestionsComponent', () => {
  let component: MedicalQuestionsComponent;
  let fixture: ComponentFixture<MedicalQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
