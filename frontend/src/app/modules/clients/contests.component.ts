import { Component } from '@angular/core';
import { ContestTableComponent } from './components/contest-table/contest-table.component';

@Component({
    selector: 'app-clients',
    templateUrl: './contests.component.html',
    styleUrl: './contests.component.css',
    standalone: true,
    imports: [ContestTableComponent]
})
export class ContestsComponent {

}
