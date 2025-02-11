import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { generateList } from './generateList';
import { PersonService } from './list.service';
import { PersonListComponent } from './person-list.component';

@Component({
  standalone: true,
  imports: [
    NgIf,
    PersonListComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [PersonService],
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="mx-auto max-w-4xl">
        <header class="mb-8 text-center">
          <h1 class="mb-4 text-3xl font-bold text-gray-900">
            Virtual Scroll Demo
          </h1>
          <button
            (click)="loadList.set(true)"
            class="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg
                   transition-all hover:bg-blue-700 focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50"
            [disabled]="loadList()">
            {{ loadList() ? 'List Loaded' : 'Load List' }}
          </button>
        </header>

        <app-person-list
          *ngIf="loadList()"
          class="block rounded-lg bg-white p-6 shadow-lg"
          [persons]="persons()" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly persons = signal(generateList());
  readonly loadList = signal(false);
}
