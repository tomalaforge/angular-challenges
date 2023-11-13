import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEnhancementDirective } from './ngfor-enhancement.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForEnhancementDirective],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; empty: emptyList">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>

    <button (click)="persons = []">Clean list</button>
    <button (click)="persons.push({ name: 'newPerson' })">Add Person</button>
    <button (click)="loadDefault()">Load Default List</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private initialData: Person[] = [
    { name: 'Mark' },
    { name: 'John' },
    { name: 'Deborah' },
    { name: 'Minko' },
    { name: 'Manfred' },
  ];
  persons: Person[] = this.loadDefault();

  loadDefault() {
    return (this.persons = [...this.initialData]);
  }
}
