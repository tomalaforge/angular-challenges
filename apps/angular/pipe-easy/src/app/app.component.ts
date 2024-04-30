import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ComputeValuesPipe } from './ComputeValuesPipe';

@Component({
  standalone: true,
  imports: [NgFor, ComputeValuesPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | computeValues: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  /*
  heavyComputation(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }
  */
}
