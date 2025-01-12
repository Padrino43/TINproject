import {Component, Inject, OnInit} from '@angular/core';
import {AlertComponent} from "../../../../shared/components/alert/alert.component";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {ContestService} from "../../../../core/services/contest.service";
import {Router} from "@angular/router";
import {Contestant} from "../../../../core/models/contestant.model";
import {ContestantService} from "../../../../core/services/contestant.service";

@Component({
  selector: 'app-delete-contestant-dialog',
    imports: [
        AlertComponent,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        NgIf
    ],
  standalone: true,
  templateUrl: './delete-contestant-dialog.component.html',
  styleUrl: './delete-contestant-dialog.component.css'
})
export class DeleteContestantDialogComponent implements OnInit {
  contestant!: Contestant;
  errorMessage = '';
  constructor(
    private dialogRef: MatDialogRef<DeleteContestantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { contestant: Contestant },
    private contestantService: ContestantService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.contestant = this.data.contestant;
  }

  onDelete() {
    this.contestantService.deleteContestant(this.contestant.id).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/contestants']);
      },
      error: () => {
        this.errorMessage = 'Wystąpił błąd.';
      },
    });
  }
}
