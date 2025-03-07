import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  randStudent,
  randTeacher,
  randomCity,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      @if (type() === CardType.TEACHER) {
        <img ngSrc="assets/img/teacher.png" width="200" height="200" />
      }
      @if (type() === CardType.STUDENT) {
        <img ngSrc="assets/img/student.webp" width="200" height="200" />
      }
      @if (type() === CardType.CITY) {
        <img ngSrc="assets/img/city.png" width="200" height="200" />
      }

      <section>
        @for (item of list(); track item) {
          @if (type() === CardType.CITY) {
            <app-list-item
              [name]="item.name"
              [id]="item.id"
              [type]="type()"></app-list-item>
          } @else {
            <app-list-item
              [name]="item.firstName"
              [id]="item.id"
              [type]="type()"></app-list-item>
          }
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgOptimizedImage],
})
export class CardComponent {
  private teacherStore = inject(TeacherStore);
  private studentStore = inject(StudentStore);
  private cityStore = inject(CityStore);

  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly customClass = input('');

  CardType = CardType;

  addNewItem() {
    const type = this.type();
    if (type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    } else if (type === CardType.CITY) {
      this.cityStore.addOne(randomCity());
    }
  }
}
