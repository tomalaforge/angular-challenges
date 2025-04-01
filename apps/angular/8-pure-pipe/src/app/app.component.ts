import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ComputePipe } from './pipe.pipe';

@Component({
  imports: [NgFor, ComputePipe],
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | compute: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
