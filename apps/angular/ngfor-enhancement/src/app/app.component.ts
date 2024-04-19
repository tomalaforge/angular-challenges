import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyNgForTemplateDirective } from './empty-ng-for-template.directive';

interface Person {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgIf, EmptyNgForTemplateDirective],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [
    { id: 1, name: 'fds' },
    { id: 2, name: 'name 2' },
  ];

  addPerson() {
    const id = Math.random();
    this.persons.push({ id, name: 'new persion added: ' });
  }

  removePerson() {
    if (!this.persons.length) {
      return;
    }

    this.persons.pop();
  }
}
