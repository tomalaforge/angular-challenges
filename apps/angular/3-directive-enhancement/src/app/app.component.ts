import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgIf],
  selector: 'app-root',
  template: `
    <div *ngIf="persons.length > 0; else emptyList">
      <div *ngFor="let person of persons">
        {{ person.name }}
      </div>
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];
}
