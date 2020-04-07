import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MultiSelectModule, RadioButtonModule, InputTextModule, ButtonModule, DropdownModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
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
    DropdownModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
