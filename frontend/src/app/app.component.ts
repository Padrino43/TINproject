import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/core/services/auth.service';
import { SpinnerComponent } from './modules/core/components/spinner/spinner.component';
import { FooterComponent } from './modules/core/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './modules/core/components/header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [
        HeaderComponent,
        RouterOutlet,
        FooterComponent,
        SpinnerComponent,
    ],
})
export class AppComponent implements OnInit {
  title = 'PJSS';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
