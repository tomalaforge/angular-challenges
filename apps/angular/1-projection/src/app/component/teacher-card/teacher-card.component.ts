import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { SectionCardDirective } from '../../directive/sectionCard.directive';
import { Actions } from '../../model/actions.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      [itemTemplate]="itemTemplate">
      <img
        priority
        sectionCard="header"
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200" />

      <ng-template #itemTemplate let-teacher>
        <app-list-item
          [id]="teacher.id"
          [name]="teacher.firstName"
          (deleteEvent)="onDeleteItem(teacher.id)"></app-list-item>
      </ng-template>

      <button
        sectionCard="footer"
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
    SectionCardDirective,
  ],
})
export class TeacherCardComponent implements OnInit, Actions {
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
