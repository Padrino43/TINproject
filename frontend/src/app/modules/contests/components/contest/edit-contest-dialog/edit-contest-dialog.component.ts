import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { Contest } from '../../../../core/models/contest.model';
import { DeleteContestDialogComponent } from '../delete-contest-dialog/delete-contest-dialog.component';
import { ContestFormComponent } from '../../contest-form/contest-form.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
    selector: 'app-edit-contest-dialog',
    templateUrl: './edit-contest-dialog.component.html',
    styleUrl: './edit-contest-dialog.component.css',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        ContestFormComponent,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  providers: [
    MatDatepickerModule,
  ],
})
export class EditContestDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditContestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contest: Contest },
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
