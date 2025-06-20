import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Ticket, TicketUser, User } from '../../backend.service';

@Component({
  selector: 'app-row',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  template: `
    <li
      class="flex flex-grow items-center justify-between gap-5"
      [class.bg-green-200]="ticket().completed">
      <button
        [routerLink]="['/detail', ticket().id]"
        class="flex flex-col gap-2">
        <div>
          <span class="font-bold">Ticket:</span>
          {{ ticket().id }}
        </div>
        <div>
          <span class="font-bold">Description:</span>
          {{ ticket().description }}
        </div>
        <div>
          <span class="font-bold">Assignee:</span>
          {{ $any(ticket()).assignee }}
        </div>
        <div>
          <span class="font-bold">Done:</span>
          {{ ticket().completed }}
        </div>
      </button>
      <div class="flex flex-col">
        <form
          [formGroup]="form"
          #ngForm="ngForm"
          (ngSubmit)="submit()"
          class="flex items-center justify-center gap-4">
          <mat-form-field appearance="fill">
            <mat-label>Assign to</mat-label>
            <mat-select formControlName="assignee">
              @for (user of users(); track user.id) {
                <mat-option [value]="user.id">
                  {{ user.name }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
          <button mat-flat-button color="primary" type="submit">Assign</button>
        </form>
        <button
          (click)="closeTicket.emit(ticket().id)"
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
  ticket = input.required<TicketUser | Ticket>();
  users = input.required<User[]>();

  assign = output<{ userId: number; ticketId: number }>();
  closeTicket = output<number>();

  form = new FormGroup({
    assignee: new FormControl(0, { nonNullable: true }),
  });

  submit() {
    this.assign.emit({
      ticketId: this.ticket().id,
      userId: this.form.getRawValue().assignee,
    });
  }
}
