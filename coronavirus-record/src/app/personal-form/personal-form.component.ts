import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoronavirusService} from '../coronavirus.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {checkEmailExsiting} from '../validations/EmailDirectiveValidators';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements OnInit {

  private personalForm: FormGroup;
  private cityOption = [];
  private countryOption = [];

  emailErrorMessage = {
    required: 'This filed is required',
    email: 'Please enter a valid email ',
    emailValidators: 'This email as been used 3 times'
  };
  countryAndCities = [];
  @Output() personalData = new EventEmitter();

  @Input() set data(value) {
    if (value) {
      this.countryOption.push({label: value.value.country, value: value.value.country});
      this.cityOption.push({label: value.value.city, value: value.value.city});
      this.personalForm = value;
      this.loadCity(value.value.country);
    }
  }

  constructor(private coronavirusService: CoronavirusService, private fb: FormBuilder) {
      coronavirusService.getCountryAndCities().subscribe(countryAndCities => {
        this.countryAndCities = countryAndCities;
        this.countryOption = countryAndCities.map(countryAndCity => {
            return {label: countryAndCity.countryName, value: countryAndCity.countryName};
          }
        );
      });
      this.personalForm = this.fb.group({
        fullName: [, Validators.required],
        age: [, Validators.required],
        gender: [, Validators.required],
        city: [, Validators.required],
        country: [, Validators.required],
        email: [, [Validators.required, Validators.email]]
      });
  // , checkEmailExsiting(this.coronavirusService) async validation
  }
  ngOnInit() {
  }

  checkValidation(key) {
    return this.personalForm.get(key).errors ? this.emailErrorMessage[Object.keys(this.personalForm.get(key).errors)[0]] : '';
  }

  onSubmit() {
      this.personalData.emit(this.personalForm);
  }


  loadCity(event) {
    this.cityOption = this.countryAndCities.find(c => c.countryName === event).cities.map(city => {return {label: city, value: city}; });
  }
}
