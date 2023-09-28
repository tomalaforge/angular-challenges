import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeavyComputationPipe } from './heavycomputation.pipe';

@Component({
  standalone: true,
  imports: [NgFor, HeavyComputationPipe],
  selector: 'app-root',

  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | compute : index }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  heavyComputation(name: string, index: number) {
    // very heavy computation
    console.log('heavy computation');
    return `${name} - ${index}`;
  }
}
