import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ConcatenatePipe } from './concatenate-pipe';

@Component({
  standalone: true,
  imports: [ConcatenatePipe, NgFor],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | concatenate:index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
