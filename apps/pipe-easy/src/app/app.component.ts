import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HeavyComputationPipe } from './heavy-computation.pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [NgFor, HeavyComputationPipe],
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | heavyComputation : index }}
    </div>
  `,
})
export class AppComponent {
  persons: string[] = ['toto', 'jack'];
}
