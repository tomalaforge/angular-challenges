import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetModule } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { TicketStore } from './ticket.store';
import { AddComponent } from './ui/add.component';
import { RowComponent } from './ui/row.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddComponent,
    RowComponent,
    MatFormFieldModule,
    MatProgressBarModule,
    NgIf,
    NgFor,
    MatInputModule,
    LetModule,
  ],
  template: `
    <h2 class="text-xl mb-2">Tickets</h2>

    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        type="text"
        matInput
        [formControl]="search"
        placeholder="write an article" />
    </mat-form-field>

    <app-add></app-add>

    <ng-container *ngrxLet="vm$ as vm">
      <mat-progress-bar
        mode="query"
        *ngIf="vm.loading"
        class="mt-5"></mat-progress-bar>
      <ul class="flex flex-col gap-4 max-w-3xl">
        <app-row *ngFor="let t of vm.tickets" [ticket]="t"> </app-row>
      </ul>
      <footer class="text-red-500">
        {{ vm.error }}
      </footer>
    </ng-container>
  `,
  providers: [provideComponentStore(TicketStore)],
  host: {
    class: 'p-5 block',
  },
})
export class ListComponent implements OnInit {
  private ticketStore = inject(TicketStore);

  vm$ = this.ticketStore.select({
    tickets: this.ticketStore.tickets$,
    loading: this.ticketStore.loading$,
    error: this.ticketStore.error$,
  });

  search = new FormControl();

  ngOnInit(): void {
    this.ticketStore.search(this.search.valueChanges);
  }
}
