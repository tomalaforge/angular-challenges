import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [type]="cardType"
      (addNewItem)="addStudent()"
      (delete)="deleteStudent($event)"
      class="bg-light-green">
      <img
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        priority
        ngProjectAs="card-img" />
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
  private store = inject(StudentStore);

  readonly students = this.store.students;
  readonly cardType = CardType.STUDENT;

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
