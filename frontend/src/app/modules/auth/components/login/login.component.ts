import { Component } from '@angular/core';
import { UserLoginData } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        NgIf,
        AlertComponent,
        MatIconButton,
        MatSuffix,
        MatIcon,
        MatButton,
        RouterLink,
    ],
})
export class LoginComponent {
  hide = true;
  userData: UserLoginData = {
    email: '',
    password: '',
  };
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.userData).subscribe({
      next: (value) => {
        if (value.length === 0) {
          this.errorMessage = 'Podano nieprawidłowe dane do logowania';
        }
      },
      error: (err) => (this.errorMessage = 'Wystąpił błąd'),
    });
  }
}
