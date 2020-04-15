import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  diagnosedOption;
  @Input() set data(value) {
    if (value) {
      this.medicalForm = value;
    }
  }
  constructor(private fb: FormBuilder) {
    this.diagnosedOption = [
      {label: 'Not Tested', value: 'NOT_TESTED'},
      {label: 'Result Pending', value: 'RESULTS_PENDING'},
      {label: 'Tested Negative', value: 'TESTED_NEGATIVE'},
      {label: 'Tested Positive', value: 'TESTED_POSITIVE'},
    ];
    this.medicalForm = this.fb.group({
      hasBeenTest: [, Validators.required],
      fever: [false],
      cough: [false],
      shortnessOfBreathOrDifficulty: [false],
      tiredness: [false],
      aches: [false],
      runnyNose: [false],
      soreThroat: [false],
      lossOfTheSenseOfSmell: [false],
      lossOfTaste: [false],
      noSymptoms: [false]
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
