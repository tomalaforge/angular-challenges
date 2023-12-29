import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    @for (person of persons; track person.name) {
      <div>{{ person.name }}</div>
    } @empty {
      The list is empty !!
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];
}
