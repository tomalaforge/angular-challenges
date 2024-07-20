import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      (addNewItem)="studentStore.addOne()"
      [items]="studentStore.$students()"
      class="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template [cardRow]="studentStore.$students()" let-student>
        <app-list-item (delete)="studentStore.deleteOne(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, CardRowDirective, ListItemComponent],
  providers: [StudentStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
  readonly studentStore = inject(StudentStore);
}
