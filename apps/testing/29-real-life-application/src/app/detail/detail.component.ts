import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { DetailStore } from './detail.store';

@Component({
  selector: 'app-detail',
  imports: [
    MatButtonModule,
    RouterLink,
    NgIf,
    AsyncPipe,
    MatProgressBarModule,
    LetDirective,
  ],
  template: `
    <h2 class="mb-2 text-xl">Ticket Detail:</h2>
    <ng-container *ngrxLet="vm$ as vm">
      <mat-progress-bar
        mode="query"
        *ngIf="vm.loading"
        class="mt-5"></mat-progress-bar>
      <section *ngIf="vm.ticket as ticket" class="flex flex-col gap-4">
        <div>
          <span class="font-bold">Ticket:</span>
          {{ ticket.id }}
        </div>
        <div>
          <span class="font-bold">Description:</span>
          {{ ticket.description }}
        </div>
        <div>
          <span class="font-bold">AssigneeId:</span>
          {{ ticket.assigneeId }}
        </div>
        <div>
          <span class="font-bold">Is done:</span>
          {{ ticket.completed }}
        </div>
      </section>
    </ng-container>

    <button
      class="mt-8"
      [routerLink]="['/list']"
      mat-flat-button
      color="primary"
      type="button">
      Back
    </button>
  `,
  providers: [provideComponentStore(DetailStore)],
  host: {
    class: 'p-5 block',
  },
})
export class DetailComponent {
  vm$ = inject(DetailStore).vm$;
}
