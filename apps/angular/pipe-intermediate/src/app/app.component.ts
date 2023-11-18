import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { VerifyPipe } from './pipes/verify.pipe';

export type Person = {
  name: string;
  age: number;
};

@Component({
  standalone: true,
  imports: [NgFor, VerifyPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ person | verify : index : isFirst }}
    </div>
  `,
})
export class AppComponent {
  persons: Person[] = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];
}
