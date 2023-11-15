import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HeavyComputePipe } from './shared/pipes/heavy-compute.pipe';

@Component({
  standalone: true,
  imports: [NgFor, HeavyComputePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons(); let index = index; tackBy: trackByFn">
      {{ person | heavyCompute : index }}
    </div>
  `,
})
export class AppComponent {
  persons = signal(['toto', 'jack']);

  trackByFn(index: number) {
    return index;
  }
}
