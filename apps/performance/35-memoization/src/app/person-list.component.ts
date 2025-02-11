import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FibonacciPipe } from './fibonacci.pipe';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    FibonacciPipe,
  ],
  template: `
    <h1 class="mb-6 text-center text-2xl font-bold text-gray-800">
      {{ title | titlecase }}
    </h1>

    <mat-form-field class="mb-6 w-full">
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        class="text-lg"
        [(ngModel)]="label" />
    </mat-form-field>

    <mat-list class="w-full divide-y divide-gray-200">
      <mat-list-item *ngFor="let person of persons" class="py-4">
        <div MatListItemLine class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">{{ person.name }}</h3>
          <mat-chip class="bg-blue-100 text-blue-800">
            Fib({{ person.fib }}) = {{ person.fib | fibonacci }}
          </mat-chip>
        </div>
      </mat-list-item>
    </mat-list>
  `,
  host: {
    class: 'block w-full',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() persons: Person[] = [];
  @Input() title = '';
  label = '';
}
