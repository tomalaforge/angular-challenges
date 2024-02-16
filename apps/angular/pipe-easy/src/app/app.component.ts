import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgFor],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ numberedPerson(person, index) }}
    </div>
  `,
})
export class AppComponent {
  // TODO: untyped array?
  persons = ['toto', 'jack', 'samuel', 'steve'];

  // TODO: very heavy computation, replace this function with a pipe
  numberedPerson(name: string, index: number) {
    return `${index + 1}. ${name}`;
  }
}
