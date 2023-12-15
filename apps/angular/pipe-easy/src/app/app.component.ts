import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TransformPipe } from './transform.pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | transform: index : person }}
    </div>
  `,
  imports: [NgFor, TransformPipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
