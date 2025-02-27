import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { generateList } from './generateList';
import { PersonListComponent } from './person-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonListComponent, NgIf],
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="mx-auto max-w-4xl">
        <header class="mb-8 text-center">
          <h1 class="mb-4 text-3xl font-bold text-gray-900">
            Performance is key!!
          </h1>
          <button
            (click)="loadList = true"
            class="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg
                   transition-all hover:bg-blue-700 focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50"
            [disabled]="loadList">
            {{ loadList ? 'List Loaded' : 'Load List' }}
          </button>
        </header>

        <app-person-list
          *ngIf="loadList"
          class="block rounded-lg bg-white p-6 shadow-lg"
          [persons]="persons"
          title="Persons" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons = generateList();
  loadList = false;
}
