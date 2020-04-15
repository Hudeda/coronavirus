import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {CoronavirusService} from '../coronavirus.service';
import {map} from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'emailValidators',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements AsyncValidator {
  constructor(private coronavirusService: CoronavirusService) {}
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return checkEmailExsiting(this.coronavirusService)(control);
  }

}

export function checkEmailExsiting(coronavirusService: CoronavirusService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return coronavirusService.getEmailValidation(control.value).pipe( map(emailNumber =>  emailNumber && emailNumber >= 3 ? {emailValidators: true} : null ));
  };
}
