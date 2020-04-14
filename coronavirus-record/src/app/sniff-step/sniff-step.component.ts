import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-sniff-step',
  templateUrl: './sniff-step.component.html',
  styleUrls: ['./sniff-step.component.scss']
})
export class SniffStepComponent {

  sniffForm;
  @Output() sniffData = new EventEmitter();
  @Output() onBackEvent = new EventEmitter();
  @Input() set data(value) {
    if (value) {
      this.sniffForm = value;
    }
  }
  constructor(private fb: FormBuilder) {
    this.sniffForm = this.fb.group({
      vanillaExtractPleasant: [50],
      vanillaExtractStrong: [50],
      peanutButterPleasant: [50],
      peanutButterStrong: [50],
      mustardDijonPleasant: [50],
      mustardDijonStrong: [50],
      garlicFreshlyChoppedPleasant: [50],
      garlicFreshlyChoppedStrong: [50]
    });
  }

  onSubmit() {
    this.sniffData.emit(this.sniffForm);
  }

  onBack() {
    this.onBackEvent.emit(this.sniffForm);
  }


}
