import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HeavyComputationPipe } from '../helpers/heaveyComputation.pipe';

@Component({
  standalone: true,
  imports: [NgFor, HeavyComputationPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      <!-- {{ heavyComputation(person, index) }} -->
      {{ person | heavyComputation : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack', 'jill', 'john', 'jane'];

  // heavyComputation(name: string, index: number) {
  //   // very heavy computation
  //   return `${name} - ${index}`;
  // }
}
