import { NgFor } from '@angular/common';
import {
  Component,
  computed,
  Pipe,
  PipeTransform,
  signal,
} from '@angular/core';

@Pipe({
  name: 'heavyComputation',
  pure: true,
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(name: string, index: number) {
    console.log(name);
    console.log(index);
    console.log('heavy computation');
    return `${name} - ${index}`;
  }
}

@Component({
  standalone: true,
  imports: [NgFor, HeavyComputationPipe],
  selector: 'app-root',
  template: `
    @for (person of computedPersons(); track $index) {
      <div>{{ person }}</div>
    }
  `,
})
export class AppComponent {
  persons = signal(['toto', 'jack']);
  computedPersons = computed(() => {
    return this.persons().map((name, index) => {
      console.log(name);
      console.log(index);
      console.log('heavy computation');
      return `${name} - ${index}`;
    });
  });
}
