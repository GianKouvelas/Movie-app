import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

// Custom Angular directive that validates the movie search input field
@Directive({
  selector: '[appSearchValidator]', // Applied to any input with appSearchValidator attribute
  providers: [{ provide: NG_VALIDATORS, useExisting: SearchValidator, multi: true }]
})
export class SearchValidator implements Validator {

  // Runs validation on every input change and returns errors or null if valid
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';

    // Rule 1: Input must be at least 3 characters long
    if (value.length < 3) {
      return { minLength: 'Minimum 3 characters required' };
    }

    // Rule 2: Input must contain only letters, numbers and spaces
    if (!/^[a-zA-Z0-9 ]*$/.test(value)) {
      return { alphanumeric: 'Only letters and numbers allowed' };
    }

    // No errors — input is valid
    return null;
  }
}