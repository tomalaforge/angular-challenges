import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgFor],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ heavyComputation(person, index) }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  heavyComputation(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
