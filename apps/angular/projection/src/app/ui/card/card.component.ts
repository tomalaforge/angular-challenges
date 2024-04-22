import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
      [ngClass]="loadBackGround()">
      <img [src]="loadCardImage()" width="200px" />

      <section>
        @for (item of list; track $index) {
          <app-list-item
            [name]="item?.firstName || item?.name"
            [id]="item.id"
            [type]="type"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }

      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }

      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [ListItemComponent, CommonModule],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;

  CardType = CardType;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  addNewItem() {
    switch (this.type) {
      case CardType.TEACHER:
        return this.teacherStore.addOne(randTeacher());
      case CardType.STUDENT:
        return this.studentStore.addOne(randStudent());
      case CardType.CITY:
        return this.cityStore.addOne(randomCity());
      default:
        return;
    }
  }

  loadBackGround() {
    switch (this.type) {
      case CardType.TEACHER:
        return 'bg-light-red';
      case CardType.STUDENT:
        return 'bg-light-green';
      case CardType.CITY:
        return 'bg-light-blue';
      default:
        return '';
    }
  }

  loadCardImage() {
    switch (this.type) {
      case CardType.TEACHER:
        return 'assets/img/teacher.png';
      case CardType.STUDENT:
        return 'assets/img/student.webp';
      case CardType.CITY:
        return 'assets/img/city.png';
      default:
        return '';
    }
  }
}
