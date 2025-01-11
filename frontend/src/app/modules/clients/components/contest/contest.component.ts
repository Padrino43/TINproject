import { Component, OnInit } from '@angular/core';
import { ContestService } from '../../../core/services/contest.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Contest } from '../../../core/models/contest.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteContestDialogComponent } from './delete-client-dialog/delete-contest-dialog.component';
import { EditContestDialogComponent } from './edit-client-dialog/edit-contest-dialog.component';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrl: './contest.component.css',
  standalone: true,
  imports: [NgIf, MatButton, MatDialogModule],
})
export class ContestComponent implements OnInit {
  contest!: Contest;
  constructor(
    private clientService: ContestService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.clientService.getContest(+params['id'])))
      .subscribe({
        next: (contest) => {
          this.contest = contest;
        },
      });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteContestDialogComponent, {
      data: {
        contest: this.contest,
      },
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditContestDialogComponent, {
      data: {
        contest: this.contest,
      },
      width: '600px',
      maxWidth: '600px',
    });
  }
}
