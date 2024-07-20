import { Component, inject } from '@angular/core';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      (addNewItem)="teachersStore.addOne()"
      [items]="teachersStore.$teachers()"
      class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />

      <ng-template
        [cardRow]="teachersStore.$teachers()"
        let-teacher
        let-id="id">
        <app-list-item (delete)="teachersStore.deleteOne(teacher.id)">
          {{ id }} - {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardRowDirective, CardComponent, ListItemComponent],
  providers: [TeacherStore],
})
export class TeacherCardComponent {
  readonly teachersStore = inject(TeacherStore);
}
