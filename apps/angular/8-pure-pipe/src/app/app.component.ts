import { Component } from '@angular/core';
import { ComputePipe } from '../pipes/compute-pipe';

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      {{ person | compute: $index }}
    }
  `,
  imports: [ComputePipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
