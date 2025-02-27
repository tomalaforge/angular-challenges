import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PersonDisplayPipe } from './pipes/person-display.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, PersonDisplayPipe],
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | personDisplay: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
