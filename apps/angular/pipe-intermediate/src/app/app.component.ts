import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CustomPipe } from './shared/custom.pipe';
import { Person } from './shared/person';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ person | custom: index : isFirst }}
    </div>
  `,
  imports: [NgFor, CustomPipe],
})
export class AppComponent {
  persons: Person[] = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];
}
