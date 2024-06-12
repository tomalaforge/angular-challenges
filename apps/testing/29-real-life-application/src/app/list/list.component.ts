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
  templateUrl: './list.component.html',
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
