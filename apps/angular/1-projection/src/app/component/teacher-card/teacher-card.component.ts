import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
    <app-card [list]="teachers()" customClass="bg-light-red">
      <div card-header class="flex flex-col items-center">
        <img ngSrc="assets/img/teacher.png" width="200" height="200" alt="" />
      </div>

      <ng-template #itemTemplate let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          [type]="cardType"
          (emitDelete)="deleteSingle($event)" />
      </ng-template>

      <div card-action>
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addNew()">
          Add
        </button>
      </div>
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
export class TeacherCardComponent implements OnInit {
  private readonly teacherStore = inject(TeacherStore);

  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNew(): void {
    this.teacherStore.addOne(randTeacher());
  }

  deleteSingle(id: number): void {
    this.teacherStore.deleteOne(id);
  }
}
