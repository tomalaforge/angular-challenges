import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Ticket, TicketUser } from '../../backend.service';
import { TicketStore } from '../ticket.store';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    AsyncPipe,
    NgFor,
  ],
  template: `
    <li
      class="flex-grow flex items-center gap-5 justify-between"
      [class.bg-green-200]="ticket.completed">
      <button [routerLink]="['/detail', ticket.id]" class="flex flex-col gap-2">
        <div><span class="font-bold">Ticket:</span> {{ ticket.id }}</div>
        <div>
          <span class="font-bold">Description:</span> {{ ticket.description }}
        </div>
        <div>
          <span class="font-bold">Assignee:</span> {{ $any(ticket).assignee }}
        </div>
        <div><span class="font-bold">Done:</span> {{ ticket.completed }}</div>
      </button>
      <div class="flex flex-col">
        <form
          [formGroup]="form"
          #ngForm="ngForm"
          (ngSubmit)="submit()"
          class="flex justify-center items-center gap-4">
          <mat-form-field appearance="fill">
            <mat-label>Assign to</mat-label>
            <mat-select formControlName="assignee">
              <mat-option
                *ngFor="let user of users$ | async"
                [value]="user.id"
                >{{ user.name }}</mat-option
              >
            </mat-select>
          </mat-form-field>
          <button mat-flat-button color="primary" type="submit">Assign</button>
        </form>
        <button
          (click)="done(ticket.id)"
          mat-flat-button
          color="primary"
          type="button">
          Done
        </button>
      </div>
    </li>
  `,
  host: {
    class: 'p-4 border border-blue-500 rounded flex',
  },
})
export class RowComponent {
  @Input() ticket!: TicketUser | Ticket;

  users$ = this.ticketStore.users$;

  form = new FormGroup({
    assignee: new FormControl(0, { nonNullable: true }),
  });

  constructor(private ticketStore: TicketStore) {}

  submit() {
    this.ticketStore.assignTicket({
      ticketId: this.ticket.id,
      userId: this.form.getRawValue().assignee,
    });
  }

  done(ticketId: number) {
    this.ticketStore.done(ticketId);
  }
}
