import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/models/user.model";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../core/services/auth.service";
import {ContestantService} from "../../../core/services/contestant.service";
import {MatButton} from "@angular/material/button";
import {DatePipe, NgIf} from "@angular/common";
import {Contestant} from "../../../core/models/contestant.model";
import {DeleteContestantDialogComponent} from "./delete-contestant-dialog/delete-contestant-dialog.component";
import {EditContestantDialogComponent} from "./edit-contestant-dialog/edit-contestant-dialog.component";
import {
  ContestantTableComponent
} from "../../../contests/components/contest/contestant-table/contestant-table.component";
import {ContestTableComponent} from "./contest-table/contest-table.component";

@Component({
  selector: 'app-contestant',
  imports: [
    MatButton,
    NgIf,
    RouterLink,
    DatePipe,
    ContestTableComponent
  ],
  standalone: true,
  templateUrl: './contestant.component.html',
  styleUrl: './contestant.component.css'
})
export class ContestantComponent implements OnInit {
  contestant!: Contestant;
  user: User | null = null;
  sub!: Subscription;
  constructor(
    private contestantService: ContestantService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => {
        return this.contestantService.getContestant(+params['id']);
      }
      ))
      .subscribe({
        next: (contestant) => {
          this.contestant = contestant;
        },
      });
    this.sub = this.authService.user.subscribe({
      next: (value) => {
        this.user = value;
      }
    })
  }

  openDeleteDialog() {
    this.dialog.open(DeleteContestantDialogComponent, {
      data: {
        contestant: this.contestant,
      },
    });
  }

  openEditDialog() {
    this.dialog.open(EditContestantDialogComponent, {
      data: {
        contestant: this.contestant,
      },
      width: '600px',
      maxWidth: '600px',
      height: '600px',
    });
  }
}
