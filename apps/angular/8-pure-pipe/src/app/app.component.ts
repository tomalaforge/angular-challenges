import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HeavyComputation } from '../heavy-computation.pipe';

@Component({
  standalone: true,
  imports: [NgFor, HeavyComputation],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | heavyComputation: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
