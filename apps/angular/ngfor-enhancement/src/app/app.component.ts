import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmptyDirective } from './ng-for-empty.directive';
import { EmptyListDirective } from './empty-list.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgIf, NgForEmptyDirective, EmptyListDirective],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; empty: emptyList">
      {{ person.name }}
    </div>
    <ng-template #emptyList appEmptyListDirective
      >The list is empty !!</ng-template
    >
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];
}
