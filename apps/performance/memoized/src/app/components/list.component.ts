import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { NgFor } from '@angular/common';
import { Person } from '../person.model';
import { FibonacciPipe } from '../pipes/fibonacci.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CDFlashingDirective,
    MatListModule,
    MatListModule,
    MatChipsModule,
    NgFor,
    FibonacciPipe
  ],
  template: `
    <mat-list class="flex w-full">
      <mat-list-item *ngFor="let person of persons; trackBy: trackByFn">
        <div MatListItemLine class="flex justify-between">
          <h3>{{ person.name }}</h3>
          <mat-chip> {{ person.fib | fibonacci }} </mat-chip>
        </div>
      </mat-list-item>
    </mat-list>
  `,
  styles: [],
  host: {
    class: 'flex w-full',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() persons: Person[] = [];

  trackByFn(index: number, person: Person) {
    return person.fib;
  }

}



