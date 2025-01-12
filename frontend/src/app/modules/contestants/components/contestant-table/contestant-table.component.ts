import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {debounceTime, distinctUntilChanged, map, merge, startWith, Subscription, switchMap} from "rxjs";
import {Contestant} from "../../../core/models/contestant.model";
import {ContestantService} from "../../../core/services/contestant.service";
import {HighlightDirective} from "../../../shared/directives/highlight.directive";

@Component({
  selector: 'app-contestant-table',
  imports: [
    MatButton,
    MatCell,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatSort,
    MatSortHeader,
    MatTable,
    ReactiveFormsModule,
    RouterLink,
    HighlightDirective,
    MatNoDataRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
  ],
  standalone: true,
  templateUrl: './contestant-table.component.html',
  styleUrl: './contestant-table.component.css'
})
export class ContestantTableComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'lp',
    'name',
    'surname',
    'startingDate',
    'buttons',
  ];
  dataSource!: MatTableDataSource<Contestant>;
  totalCount = 0;
  filterValue = new FormControl('', { nonNullable: true });
  sub = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private contestantService: ContestantService) {}

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
            );
          }),
          map((data) => {
            this.totalCount = data.totalCount;

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
      .getContestants(pageIndex, itemsPerPage, sortDirection, sortColumnName, val)
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
