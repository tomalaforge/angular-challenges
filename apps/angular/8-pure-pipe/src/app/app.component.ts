import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TextNumberPipe } from './pipes/text-number.pipe';

@Component({
  standalone: true,
  imports: [NgFor, TextNumberPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | textNumber: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
