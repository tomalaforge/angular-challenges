import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Ticket, TicketUser, User } from '../../backend.service';

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
    NgFor,
  ],
  templateUrl: './row.component.html',
  host: {
    class: 'p-4 border border-blue-500 rounded flex',
  },
})
export class RowComponent {
  @Input() ticket!: TicketUser | Ticket;
  @Input() users!: User[];

  @Output() assign = new EventEmitter<{ userId: number; ticketId: number }>();
  @Output() closeTicket = new EventEmitter<number>();

  form = new FormGroup({
    assignee: new FormControl(0, { nonNullable: true }),
  });

  submit() {
    this.assign.emit({
      ticketId: this.ticket.id,
      userId: this.form.getRawValue().assignee,
    });
  }
}
