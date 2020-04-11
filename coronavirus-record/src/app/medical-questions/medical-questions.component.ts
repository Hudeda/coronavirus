import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoronavirusService} from '../coronavirus.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-medical-questions',
  templateUrl: './medical-questions.component.html',
  styleUrls: ['./medical-questions.component.scss']
})
export class MedicalQuestionsComponent implements OnInit {

  private medicalForm: FormGroup;
  @Output() medicalData = new EventEmitter();
  @Output() onBackEvent = new EventEmitter();

  @Input() set data(value) {
    if (value) {
      this.medicalForm = value;
    }
  }

  constructor(private fb: FormBuilder) {

    this.medicalForm = this.fb.group({
      question1: [, Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.medicalData.emit(this.medicalForm);
  }

  onBack() {
    this.onBackEvent.emit(this.medicalForm);
  }

}
