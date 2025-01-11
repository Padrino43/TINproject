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

    return 'Niepoprawna wartość';
  }
}
