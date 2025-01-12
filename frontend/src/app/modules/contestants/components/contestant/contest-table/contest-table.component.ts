import {AfterViewInit, Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {HighlightDirective} from "../../../../shared/directives/highlight.directive";
import {Contest} from "../../../../core/models/contest.model";
import {debounceTime, distinctUntilChanged, map, merge, startWith, Subscription, switchMap} from "rxjs";
import {ContestService} from "../../../../core/services/contest.service";

@Component({
  selector: 'app-contest-table',
  imports: [
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
    MatHeaderCellDef
  ],
  templateUrl: './contest-table.component.html',
  styleUrl: './contest-table.component.css'
})
export class ContestTableComponent implements AfterViewInit, OnDestroy{
  displayedColumns: string[] = [
    'lp',
    'name',
    'date',
    'startAt',
    'finishAt',
    'score',
    // 'buttons',
  ];
  dataSource!: MatTableDataSource<Contest>;
  totalCount = 0;
  filterValue = new FormControl('', { nonNullable: true });
  sub = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() contestantId!: number;
  constructor(private contestService: ContestService) {}

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

            return this.contestService.getContests(
              pageIndex,
              itemsPerPage,
              sortDirection,
              sortColumnName,
              true,
              this.contestantId
            );
          }),
          map((data) => {
            this.totalCount = data.totalCount;

            return data.contests;
          }),
        )
        .subscribe((contests) => {
          this.dataSource = new MatTableDataSource<Contest>(contests);
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

    this.contestService
      .getContests(pageIndex, itemsPerPage, sortDirection, sortColumnName, true, this.contestantId, val)
      .subscribe({
        next: (response) => {
          this.totalCount = response.totalCount;
          this.dataSource = new MatTableDataSource<Contest>(response.contests);
        },
      });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
