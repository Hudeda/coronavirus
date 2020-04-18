import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-gratitude-step',
  templateUrl: './gratitude-step.component.html',
  styleUrls: ['./gratitude-step.component.scss']
})
export class GratitudeStepComponent {

  @Output() gratitudeHome = new EventEmitter();

  constructor() { }

  homeScreen() {
      this.gratitudeHome.emit();
  }

}
