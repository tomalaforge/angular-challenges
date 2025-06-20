import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [items]="students()"
      (addNewItem)="studentStore.addOne()"
      class="bg-light-green">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />

      <ng-template [cardRow]="students()" let-student>
        <app-list-item (delete)="studentStore.deleteOne(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    CardRowDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
  providers: [StudentStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
  readonly studentStore = inject(StudentStore);

  get students(): Signal<Student[]> {
    return this.studentStore.$students;
  }
}
