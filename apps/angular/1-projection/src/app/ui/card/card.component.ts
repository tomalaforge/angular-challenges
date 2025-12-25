import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  randomCity,
  randStudent,
  randTeacher,
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
      [style.backgroundColor]="backgroundColor()">
      <img [ngSrc]="imageSrc()" width="200" height="200" />

      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="itemName(item)"
            [id]="item.id"
            [type]="type()"></app-list-item>
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
  readonly backgroundColor = input('');

  CardType = CardType;

  addHandler: Record<CardType, () => void> = {
    [CardType.TEACHER]: () => this.teacherStore.addOne(randTeacher()),
    [CardType.STUDENT]: () => this.studentStore.addOne(randStudent()),
    [CardType.CITY]: () => this.cityStore.addOne(randomCity()),
  };

  nameLookup: Record<CardType, (item: any) => string> = {
    [CardType.TEACHER]: (item: any) => item.firstName,
    [CardType.STUDENT]: (item: any) => item.firstName,
    [CardType.CITY]: (item: any) => item.name,
  };

  addNewItem() {
    this.addHandler[this.type()]();
  }

  itemName(item: any) {
    return this.nameLookup[this.type()](item);
  }

  imageLookup: Record<CardType, string> = {
    [CardType.TEACHER]: 'assets/img/teacher.png',
    [CardType.STUDENT]: 'assets/img/student.webp',
    [CardType.CITY]: 'assets/img/city.png',
  };

  imageSrc = computed(() => this.imageLookup[this.type()]);
}
