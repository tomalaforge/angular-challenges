import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      {{ heavyComputation(person, $index) }}
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  heavyComputation(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
