import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EnhancedNgForDirective } from './directives/enhanced-ngfor.directive';

interface Person {
  name: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Person List</h1>

      <div class="list-container">
        <div
          *ngFor="let person of persons; empty: emptyList"
          class="person-item">
          <span>👤</span>
          {{ person.name }}
        </div>
        <ng-template #emptyList>
          <div class="empty-state">
            <span>👥</span>
            <p>The list is empty !!</p>
          </div>
        </ng-template>
      </div>

      <div class="controls">
        <button class="btn add" (click)="addPerson()">
          <span class="icon">➕</span>
          Add Person
        </button>
        <button class="btn clear" (click)="clearPersons()">
          <span class="icon">🗑️</span>
          Clear List
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        @apply mx-auto mt-8 max-w-2xl rounded-lg bg-white p-8 shadow-lg;
      }

      h1 {
        @apply mb-6 text-2xl font-bold text-gray-800;
      }

      .list-container {
        @apply min-h-[200px] rounded-lg bg-gray-50 p-4;
      }

      .person-item {
        @apply mb-2 flex items-center gap-2 rounded-md bg-white p-4 shadow-sm;
        @apply border border-gray-100;
        @apply transition-all duration-200;
        @apply hover:border-blue-200 hover:shadow-md;
        span {
          @apply text-xl;
        }
      }

      .empty-state {
        @apply flex h-[200px] flex-col items-center justify-center;
        @apply text-gray-500;
        span {
          @apply mb-2 text-4xl;
        }
        p {
          @apply text-lg;
        }
      }

      .controls {
        @apply mt-6 flex justify-between gap-4;
      }

      .btn {
        @apply flex items-center gap-2 rounded-lg px-6 py-3 font-medium;
        @apply transform transition-all duration-200;
        @apply disabled:cursor-not-allowed disabled:opacity-50;
        @apply hover:scale-105 active:scale-95;
        @apply shadow-sm;

        .icon {
          @apply text-lg;
        }
      }

      .add {
        @apply bg-gradient-to-r from-blue-500 to-blue-600 text-white;
        @apply hover:from-blue-600 hover:to-blue-700;
        @apply focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
      }

      .clear {
        @apply bg-gradient-to-r from-red-50 to-red-100 text-red-600;
        @apply hover:from-red-100 hover:to-red-200;
        @apply focus:ring-2 focus:ring-red-500 focus:ring-offset-2;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EnhancedNgForDirective],
  standalone: true,
})
export class AppComponent {
  persons: Person[] = [];

  addPerson() {
    this.persons = [
      ...this.persons,
      { name: `Person ${this.persons.length + 1}` },
    ];
  }

  clearPersons() {
    this.persons = [];
  }
}
