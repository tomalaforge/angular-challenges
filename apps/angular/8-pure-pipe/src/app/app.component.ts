import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CustomPipe } from './custom.pipe';

@Component({
  standalone: true,
  imports: [NgFor, CustomPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | custom: index }}
    </div>
    <button (click)="onclick()"> Click me</button>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
  onclick(){
    this.persons[0]="tototo"
    this.persons[2]="aaaaaa"
  }
}
