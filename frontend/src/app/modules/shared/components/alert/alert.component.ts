import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.scss',
    standalone: true,
})
export class AlertComponent {
  @Input() text!: string;
}
