import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ComputationPipe } from '../pipes/computationPipe';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | computationPipe: index }}
    </div>
  `,
  imports: [NgFor, ComputationPipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
