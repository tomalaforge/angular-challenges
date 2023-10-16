import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NameIndexPipe } from './nameIndex.pipe';

@Component({
  standalone: true,
  imports: [NgFor, NameIndexPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | nameIndex : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
