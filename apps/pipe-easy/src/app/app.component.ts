import { NgFor } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  standalone: true,
  pure: true,
  name: 'heavyComputation',
})
export class HeavyComputationPipe implements PipeTransform {
  transform(value: string, index: number) {
    return `Piped@${new Date()}: ${value} - ${index}`;
  }
}

@Component({
  standalone: true,
  imports: [NgFor, HeavyComputationPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | heavyComputation : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  constructor(cdr: ChangeDetectorRef) {
    // Test to verify that the date/time in the transform output does not change:
    setInterval(() => cdr.markForCheck(), 1000);
  }
}
