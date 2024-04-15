import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ComputationPipe } from './computation.pipe';

@Component({
  standalone: true,
  imports: [ComputationPipe, TitleCasePipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track persons; let index = $index) {
      <div>
        {{ person | computation: index | titlecase }}
      </div>
    } @empty {
      <div>There is no data</div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
