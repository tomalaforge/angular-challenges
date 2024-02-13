import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
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
    LetDirective,
  ],
  template: `
    <h2 class="mb-2 text-xl">Tickets</h2>

    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        type="text"
        matInput
        [formControl]="search"
        placeholder="write an article" />
    </mat-form-field>

    <ng-container *ngrxLet="vm$ as vm">
      <app-add
        [loading]="vm.loading"
        (addTicket)="ticketStore.addTicket($event)"></app-add>

      <mat-progress-bar
        mode="query"
        *ngIf="vm.loading"
        class="mt-5"></mat-progress-bar>
      <ul class="flex max-w-3xl flex-col gap-4">
        <app-row
          *ngFor="let t of vm.tickets"
          [ticket]="t"
          [users]="vm.users"
          (assign)="ticketStore.assignTicket($event)"
          (closeTicket)="ticketStore.done($event)"></app-row>
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
  ticketStore = inject(TicketStore);
  readonly vm$ = this.ticketStore.vm$;

  search = new FormControl();

  ngOnInit(): void {
    this.ticketStore.search(this.search.valueChanges);
  }
}
