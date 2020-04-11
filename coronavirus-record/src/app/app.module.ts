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
  ProgressSpinnerModule, MessageService
} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { MedicalQuestionsComponent } from './medical-questions/medical-questions.component';
import { CoughStepComponent } from './cough-step/cough-step.component';
import {AudioRecordingService} from './audio-recording.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonalFormComponent,
    MedicalQuestionsComponent,
    CoughStepComponent
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
    ProgressSpinnerModule

  ],
  providers: [AudioRecordingService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
