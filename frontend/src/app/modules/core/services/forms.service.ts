import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}

  getErrorMessage(control: FormControl) {
    if (control.hasError('minlength')) {
      return 'Za mało znaków.';
    }
    if (control.hasError('maxlength')) {
      return 'Za dużo znaków.';
    }
    if (control.hasError('min')) {
      return 'Wartość nie może być mniejsza niż 0.';
    }
    if (control.hasError('max')) {
      return 'Wartość nie może być większa niż 100.';
    }

    return 'Niepoprawna wartość';
  }
}
