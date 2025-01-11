import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Contest } from '../../../../core/models/contest.model';
import { ContestService } from '../../../../core/services/contest.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-delete-contest-dialog',
    templateUrl: './delete-contest-dialog.component.html',
    styleUrl: './delete-contest-dialog.component.css',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        NgIf,
        AlertComponent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class DeleteContestDialogComponent implements OnInit {
  contest!: Contest;
  errorMessage = '';
  constructor(
    private dialogRef: MatDialogRef<DeleteContestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { contest: Contest },
    private clientsService: ContestService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.contest = this.data.contest;
  }

  onDelete() {
    this.clientsService.deleteClient(this.contest.id).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/contests']);
      },
      error: (err) => {
        this.errorMessage = 'Wystąpił błąd.';
      },
    });
  }
}
