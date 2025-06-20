import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [items]="teacherStore.$teachers()"
      (addNewItem)="teacherStore.addOne()"
      class="bg-light-red">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />

      <ng-template [cardRow]="teacherStore.$teachers()" let-teacher>
        <app-list-item (delete)="teacherStore.deleteOne(teacher.id)">
          {{ teacher.firstName }}
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
  imports: [
    CardComponent,
    CardRowDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
  providers: [TeacherStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent {
  readonly teacherStore = inject(TeacherStore);

  get teachers(): Signal<Teacher[]> {
    return this.teacherStore.$teachers;
  }
}
