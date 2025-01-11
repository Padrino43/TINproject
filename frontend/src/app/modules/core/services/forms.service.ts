import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Ta wartość musi być podana.';
    }

    if (control.hasError('minlength')) {
      return 'Za mało znaków.';
    }
    if (control.hasError('maxlength')) {
      return 'Za dużo znaków.';
    }

    if (control.hasError('invalidPostcode')) {
      return 'Niepoprawny kod pocztowy. Poprawny format to xx-xxx.';
    }

    return control.hasError('email') ? 'Błędny adres email.' : '';
  }
}
