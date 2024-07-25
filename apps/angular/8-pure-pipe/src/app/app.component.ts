import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TextPipe } from './pipes/text.pipe';

@Component({
  standalone: true,
  imports: [NgFor, TextPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | textPipe: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  heavyComputation(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
