import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ShowNamePipe } from './show-name.pipe';
import { IsAllowedPipe } from './is-allowed.pipe';

@Component({
  standalone: true,
  imports: [NgFor, ShowNamePipe, IsAllowedPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ person.name | showName : index }}
      {{ person.age | isAllowed : isFirst }}
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];
}
