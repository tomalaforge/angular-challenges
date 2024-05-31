import { Component } from '@angular/core';
import { TextNumberPipe } from './pipes/text-number.pipe';

@Component({
  standalone: true,
  imports: [TextNumberPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track $index) {
      <div>
        {{ person | textNumber: $index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
