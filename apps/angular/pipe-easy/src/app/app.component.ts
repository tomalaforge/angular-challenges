import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HeavyTransformationPipe } from './pipes/heavy-computation.pipe';

@Component({
  standalone: true,
  imports: [NgFor, HeavyTransformationPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | heavyTransformation : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'Jack'];
}
