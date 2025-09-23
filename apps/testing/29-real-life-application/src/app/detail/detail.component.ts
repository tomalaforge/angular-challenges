import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { DetailStore } from './detail.store';

@Component({
  selector: 'app-detail',
  imports: [MatButtonModule, RouterLink, MatProgressBarModule, AsyncPipe],
  template: `
    <h2 class="mb-2 text-xl">Ticket Detail:</h2>
    @if (vm$ | async; as vm) {
      @if (vm.loading) {
        <mat-progress-bar mode="query" class="mt-5"></mat-progress-bar>
      }
      @if (vm.ticket) {
        <section class="flex flex-col gap-4">
          <div>
            <span class="font-bold">Ticket:</span>
            {{ vm.ticket.id }}
          </div>
          <div>
            <span class="font-bold">Description:</span>
            {{ vm.ticket.description }}
          </div>
          <div>
            <span class="font-bold">AssigneeId:</span>
            {{ vm.ticket.assigneeId }}
          </div>
          <div>
            <span class="font-bold">Is done:</span>
            {{ vm.ticket.completed }}
          </div>
        </section>
      }
    }

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
