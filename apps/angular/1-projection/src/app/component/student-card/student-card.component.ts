import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardItemDirective } from '../../ui/card/card-item-context.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students.value()"
      class="bg-light-green"
      (onAddNewItem)="addNewItem()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />

      <ng-template [appCardItem]="_studentType" #itemTemplate let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          [type]="cardType"
          (onDeleteItem)="deleteStudent(item.id)"></app-list-item>
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
    NgOptimizedImage,
    ListItemComponent,
    CardItemDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
  private store = inject(StudentStore);
  readonly _studentType!: Student;

  students = this.store.students;
  cardType = CardType.STUDENT;

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
