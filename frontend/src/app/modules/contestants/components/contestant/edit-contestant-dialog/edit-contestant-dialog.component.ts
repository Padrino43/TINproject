import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {Contestant} from "../../../../core/models/contestant.model";
import {ContestantFormComponent} from "../../contestant-form/contestant-form.component";

@Component({
  selector: 'app-edit-contestant-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    ContestantFormComponent
  ],
  standalone: true,
  templateUrl: './edit-contestant-dialog.component.html',
  styleUrl: './edit-contestant-dialog.component.css'
})
export class EditContestantDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditContestantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contestant: Contestant },
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
