import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
    standalone: true,
})
export class AlertComponent {
  @Input() text!: string;
}
