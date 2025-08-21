import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardActions } from '../../model';
import {
  CardComponent,
  CardSectionDirective,
  ListItemComponent,
} from '../../ui';
@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      [cardItemTemplate]="cardItemTemplate">
      <img
        priority
        cardSection="header"
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200" />

      <ng-template #cardItemTemplate let-teacher>
        <app-list-item
          [name]="teacher.firstName"
          [id]="teacher.id"
          (deleteEvent)="onDeleteItem($event)"></app-list-item>
      </ng-template>

      <button
        cardSection="footer"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddNewItem()">
        Add
      </button>
    </app-card>
  `,
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    CardSectionDirective,
  ],
})
export class TeacherCardComponent implements OnInit, CardActions {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }

  onAddNewItem() {
    this.store.addOne(randTeacher());
  }
}
