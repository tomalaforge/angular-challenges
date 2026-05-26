import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (add)="addNewItem()">
      <div card-header>
        <img
          ngSrc="assets/img/teacher.png"
          width="200"
          height="200"
          alt=""
          priority />
      </div>

      <ng-template #itemRef let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          (emitDelete)="delete($event)" />
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      :host {
        --card-bg: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class TeacherCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  constructor() {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
