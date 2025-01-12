import { Component } from '@angular/core';
import {ContestantTableComponent} from "./components/contestant-table/contestant-table.component";

@Component({
  selector: 'app-contestants',
  imports: [
    ContestantTableComponent
  ],
  standalone: true,
  templateUrl: './contestants.component.html',
  styleUrl: './contestants.component.css'
})
export class ContestantsComponent {

}
