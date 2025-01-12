import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {
  ContestantAddToContestFormComponent
} from "../contestant-add-to-contest-form/contestant-add-to-contest-form.component";
import {Contestant} from "../../../../core/models/contestant.model";
import {Contest} from "../../../../core/models/contest.model";

@Component({
  selector: 'app-edit-contestant-points-dialog',
  imports: [
    ContestantAddToContestFormComponent,
    MatDialogContent,
    MatDialogTitle

  ],
  templateUrl: './edit-contestant-points-dialog.component.html',
  styleUrl: './edit-contestant-points-dialog.component.css'
})
export class EditContestantPointsDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditContestantPointsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contest: Contest, contestant: Contestant },
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
