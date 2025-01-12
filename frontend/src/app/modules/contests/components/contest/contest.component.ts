import {Component, OnInit, Output} from '@angular/core';
import { ContestService } from '../../../core/services/contest.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Subscription, switchMap} from 'rxjs';
import { Contest } from '../../../core/models/contest.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteContestDialogComponent } from './delete-contest-dialog/delete-contest-dialog.component';
import { EditContestDialogComponent } from './edit-contest-dialog/edit-contest-dialog.component';
import { MatButton } from '@angular/material/button';
import {DatePipe, NgIf} from '@angular/common';
import {AuthService} from "../../../core/services/auth.service";
import {User} from "../../../core/models/user.model";
import {ContestantTableComponent} from "./contestant-table/contestant-table.component";
import {
  EditContestantPointsDialogComponent
} from "./edit-contestant-points-dialog/edit-contestant-points-dialog.component";
import {Contestant} from "../../../core/models/contestant.model";

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrl: './contest.component.css',
  standalone: true,
  imports: [NgIf, MatButton, MatDialogModule, RouterLink, ContestantTableComponent, DatePipe],
})
export class ContestComponent implements OnInit {
  @Output() contest!: Contest;
  @Output() contestant!: Contestant;
  user: User | null = null;
  sub!: Subscription;
  constructor(
    private contestService: ContestService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => {
        return this.contestService.getContest(+params['id']);
      }))
      .subscribe({
        next: (contest) => {
          this.contest = contest;
        },
      });
    this.sub = this.authService.user.subscribe({
      next: (value) => {
        this.user = value;
      }
    })
  }

  openDeleteDialog() {
   this.dialog.open(DeleteContestDialogComponent, {
      data: {
        contest: this.contest,
      },
    });
  }

  openEditDialog() {
    this.dialog.open(EditContestDialogComponent, {
      data: {
        contest: this.contest,
      },
      width: '600px',
      maxWidth: '600px',
      height: '600px',
    });
  }
}
