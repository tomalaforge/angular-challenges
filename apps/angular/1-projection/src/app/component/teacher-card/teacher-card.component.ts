import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardItemDirective } from '../../ui/card/card-item-context.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers.value()"
      class="bg-light-red"
      (onAddNewItem)="addNewTeacher()">
      <img priority ngSrc="assets/img/teacher.png" width="200" height="200" />

      <ng-template [appCardItem]="_teacherType" #itemTemplate let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          [type]="cardType"
          (onDeleteItem)="deleteTeacher(item.id)"></app-list-item>
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
    NgOptimizedImage,
    ListItemComponent,
    CardItemDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent {
  private store = inject(TeacherStore);
  readonly _teacherType!: Teacher;

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  addNewTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
