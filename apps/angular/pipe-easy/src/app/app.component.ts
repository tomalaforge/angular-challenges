import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PersonLabelPipe } from './person-label.pipe';

@Component({
  standalone: true,
  imports: [NgFor, PersonLabelPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | personLabel: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
