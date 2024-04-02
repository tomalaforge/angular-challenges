import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Person } from './person.model';
import { wrapFnPipe } from './pipes/wrapFn.pipe';

@Component({
  standalone: true,
  imports: [NgFor, wrapFnPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ person | wrapFn: index : isFirst }}
    </div>
  `,
})
export class AppComponent {
  persons: Person[] = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];
}
