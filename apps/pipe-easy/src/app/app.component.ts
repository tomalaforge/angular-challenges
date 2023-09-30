import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ToLabelPipe } from './to-label.pipe';

@Component({
  standalone: true,
  imports: [NgFor, ToLabelPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | toLabel : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
