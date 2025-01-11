import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  standalone: true,
  imports: [NgIf, MatProgressSpinner, AsyncPipe],
})
export class SpinnerComponent {
  isLoading = this.spinnerService.isLoading;
  constructor(private spinnerService: SpinnerService) {}
}
