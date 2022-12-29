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
  transform(value: string, ...args: [index: number]) {
    return `Piped@${new Date()}: ${value} - ${args[0]}`;
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
    setInterval(() => cdr.markForCheck(), 1000);
  }
}
