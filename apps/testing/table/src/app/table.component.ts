import { FakeBackendService } from '@angular-challenges/testing-table/backend';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { User } from '@ngneat/falso';
import { LetDirective } from '@ngrx/component';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, pipe, startWith, switchMap, tap } from 'rxjs';

interface TableState {
  loading: boolean;
  error?: string;
  users: User[];
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    LetDirective,
    NgIf,
    AsyncPipe,
    DatePipe,
  ],
  template: `
    <div class="example-container mat-elevation-z8">
      <div class="example-loading-shade" *ngIf="loading$ | async">
        <mat-spinner></mat-spinner>
        <!-- <div class="example-rate-limit-reached" *ngIf="isRateLimitReached">
          GitHub's API rate limit has been reached. It will be reset in one
          minute.
        </div> -->
      </div>

      <div class="example-table-container">
        <table
          mat-table
          [dataSource]="(issues$ | async) ?? []"
          class="example-table"
          matSort>
          <!-- Number Column -->
          <ng-container matColumnDef="firstName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>FirstName</th>
            <td mat-cell *matCellDef="let row">{{ row.firstName }}</td>
          </ng-container>

          <!-- Title Column -->
          <ng-container matColumnDef="lastName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>LastName</th>
            <td mat-cell *matCellDef="let row">{{ row.lastName }}</td>
          </ng-container>

          <!-- State Column -->
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
            <td mat-cell *matCellDef="let row">{{ row.email }}</td>
          </ng-container>

          <!-- Created Column -->
          <!-- <ng-container matColumnDef="created">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Created</th>
            <td mat-cell *matCellDef="let row">{{ row.created_at | date }}</td>
          </ng-container> -->

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>

      <mat-paginator
        [length]="resultsLength$ | async"
        [pageSize]="30"
        aria-label="Select page of GitHub search results"></mat-paginator>
    </div>
  `,
})
export class TableComponent
  extends ComponentStore<TableState>
  implements AfterViewInit
{
  readonly displayedColumns = ['firstName', 'lastName', 'email'];

  private api = inject(FakeBackendService);

  readonly issues$ = this.select((s) => s.users).pipe(
    tap((t) => console.log('UserNEw ', t)),
  );
  readonly loading$ = this.select((s) => s.loading);
  readonly error$ = this.select((s) => s.error);
  readonly resultsLength$ = this.select((s) => 100);

  // resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    super({ loading: false, users: [] });
  }

  readonly loadData = this.effect<{
    sortActive: keyof User;
    sortDir: SortDirection;
    pageIndex: number;
  }>(
    pipe(
      tap((t) => console.log('cocou', t)),
      tap(() => this.patchState({ loading: true, users: [] })),
      switchMap(({ sortActive, sortDir, pageIndex }) =>
        this.api.getUsers(sortActive, sortDir, pageIndex).pipe(
          tap((t) => console.log('user', t)),
          tapResponse(
            (data) => this.patchState({ users: data, loading: false }),
            (err) => this.patchState({ error: err as string, loading: false }),
          ),
        ),
      ),
    ),
  );

  ngAfterViewInit(): void {
    // due to ExpressionChangedAfterItHasBeenCheckedError
    console.log('cocuo', this.sort, this.paginator);
    this.loadData(
      this.select({
        sortActive: this.sort.sortChange.pipe(
          map((s) => s.active as keyof User),
        ),
        sortDir: this.sort.sortChange.pipe(map((s) => s.direction)),
        pageIndex: this.paginator.page.pipe(map((p) => p.pageIndex)),
      }).pipe(
        startWith({
          sortActive: this.sort.active as keyof User,
          sortDir: this.sort.direction,
          pageIndex: 1,
        }),
      ),
    );
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
