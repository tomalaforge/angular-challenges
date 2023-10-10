import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { heavyComputation } from '../shared/computation.pipe';

@Component({
  standalone: true,
  imports: [NgFor, heavyComputation],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | heavyComputation : index }}
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
