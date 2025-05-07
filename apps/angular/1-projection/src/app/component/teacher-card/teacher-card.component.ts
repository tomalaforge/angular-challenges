import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [type]="cardType"
      (addNewItem)="addTeacher()"
      (delete)="deleteTeacher($event)"
      class="bg-light-red">
      <img
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        priority
        ngProjectAs="card-img" />
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent {
  private store = inject(TeacherStore);

  readonly teachers = this.store.teachers;
  readonly cardType = CardType.TEACHER;

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
