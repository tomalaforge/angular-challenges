import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HeavyComputationPipe } from './shared/HeavyComputation.pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | heavy: index }}
    </div>
  `,
  imports: [NgFor, HeavyComputationPipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
