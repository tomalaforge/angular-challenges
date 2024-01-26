import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MyPipePipe } from './my-pipe.pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | myPipe: index }}
    </div>
  `,
  imports: [NgFor, MyPipePipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
