import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MultiSelectModule,
  RadioButtonModule,
  InputTextModule,
  ButtonModule,
  DropdownModule,
  StepsModule,
  ProgressSpinnerModule, MessageService, CheckboxModule, SliderModule
} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { MedicalQuestionsComponent } from './medical-questions/medical-questions.component';
import { CoughStepComponent } from './cough-step/cough-step.component';
import {AudioRecordingService} from './audio-recording.service';
import { SniffStepComponent } from './sniff-step/sniff-step.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalFormComponent,
    MedicalQuestionsComponent,
    CoughStepComponent,
    SniffStepComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    ReactiveFormsModule,
    RadioButtonModule,
    MultiSelectModule,
    DropdownModule,
    StepsModule,
    ProgressSpinnerModule,
    CheckboxModule,
    SliderModule

  ],
  providers: [AudioRecordingService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
