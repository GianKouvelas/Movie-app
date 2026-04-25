import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appSearchValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: SearchValidator, multi: true }]
})
export class SearchValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    
    if (value.length < 3) {
      return { minLength: 'Minimum 3 characters required' };
    }
    
    if (!/^[a-zA-Z0-9 ]*$/.test(value)) {
      return { alphanumeric: 'Only letters and numbers allowed' };
    }
    
    return null;
  }
}