import { NgFor, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ComputationPipe } from './computation.pipe';

@Component({
  standalone: true,
  imports: [NgFor, ComputationPipe, TitleCasePipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person; let index = $index) {
      <div>
        {{ person | customPipe: index | titlecase }}
      </div>
    } @empty {
      <div>There is no data</div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
