import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: true,
    imports: [
        MatToolbar,
        MatButton,
        RouterLink,
        NgIf,
    ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null = null;
  sub!: Subscription;
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe({
      next: (value) => {
        this.user = value;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
