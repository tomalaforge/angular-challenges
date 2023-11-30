import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TransformPipe, IsAllowPipe } from '../../transform.pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ person.name | transform: index }}
      {{ person.age | isAllow: isFirst }}
    </div>
  `,
  imports: [NgFor, TransformPipe, IsAllowPipe],
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];
}
