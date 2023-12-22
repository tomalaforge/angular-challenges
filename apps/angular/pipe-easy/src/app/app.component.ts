import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { JoinPipe } from './pipes/join.pipe';

@Component({
  standalone: true,
  imports: [NgFor, JoinPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ '-' | join: person : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
