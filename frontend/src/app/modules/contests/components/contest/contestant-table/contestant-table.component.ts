import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {Contestant} from "../../../../core/models/contestant.model";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, merge, startWith, Subscription, switchMap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {ContestantService} from "../../../../core/services/contestant.service";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {HighlightDirective} from "../../../../shared/directives/highlight.directive";
import {MatDialog} from "@angular/material/dialog";
import {
  EditContestantPointsDialogComponent
} from "../edit-contestant-points-dialog/edit-contestant-points-dialog.component";
import {Contest} from "../../../../core/models/contest.model";
import {ContestService} from "../../../../core/services/contest.service";
import {AuthService} from "../../../../core/services/auth.service";
import {User} from "../../../../core/models/user.model";

@Component({
  selector: 'app-contestant-table',
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    ReactiveFormsModule,
    HighlightDirective,
    MatNoDataRow,
    MatHeaderCellDef,
  ],
  templateUrl: './contestant-table.component.html',
  styleUrl: './contestant-table.component.css',
  standalone: true,
})
export class ContestantTableComponent implements OnInit, AfterViewInit, OnDestroy{
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<Contestant>;
  totalCount = 0;
  filterValue = new FormControl('', { nonNullable: true });
  sub = new Subscription();
  contest!: Contest;
  user!: User | null;
  userSub!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() contestId!: number;

  constructor(
    private authService: AuthService,
    private contestantService: ContestantService,
    private contestService: ContestService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe({
      next: (value) => {
        this.user = value;
        if (this.user !== null) {
          this.displayedColumns = [
            'lp',
            'name',
            'surname',
            'score',
            'editButton',
            'deleteButton',
          ];
        }
        else {
          this.displayedColumns = [
            'lp',
            'name',
            'surname',
            'score',
          ];
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub.add(
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            const pageIndex = this.paginator.pageIndex + 1;
            const itemsPerPage = this.paginator.pageSize;
            const sortDirection = this.sort.direction;
            const sortColumnName = this.sort.active;

            return this.contestantService.getContestants(
              pageIndex,
              itemsPerPage,
              sortDirection,
              sortColumnName,
              true,
              this.contestId
            );
          }),
          map((data) => {
            this.totalCount = data.totalCount;
            this.contestService.getContest(this.contestId).subscribe((contest) => {
              this.contest = contest;
            });
            return data.contestants;
          }),
        )
        .subscribe((contestants) => {
          this.dataSource = new MatTableDataSource<Contestant>(contestants);
        }),
    );

    this.sub.add(
      this.filterValue.valueChanges
        .pipe(debounceTime(800), distinctUntilChanged())
        .subscribe((value) => {
          const val = value?.trim();
          this.applyFilter(val);
        }),
    );
  }
    applyFilter(val: string) {
      const pageIndex = this.paginator.pageIndex + 1;
      const itemsPerPage = this.paginator.pageSize;
      const sortDirection = this.sort.direction;
      const sortColumnName = this.sort.active;

      this.contestantService
        .getContestants(pageIndex, itemsPerPage, sortDirection, sortColumnName, true, this.contestId,val)
        .subscribe({
          next: (response) => {
            this.totalCount = response.totalCount;
            this.dataSource = new MatTableDataSource<Contestant>(response.contestants);
          },
        });

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    onEdit(row: Contestant){
      this.dialog.open(EditContestantPointsDialogComponent, {
        data: {
          contest: this.contest,
          contestant: row,
        },
        width: '600px',
        maxWidth: '600px',
        height: '600px',
      });
    }

  onDelete(id: number) {
    this.contestantService.deleteContestantFromContest(id, this.contestId).subscribe(
      ()=> {this.ngAfterViewInit();});
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
}
