import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [templateType]="teacher"
      (itemAdded)="onTeacherAdded()"
      customClass="bg-light-red">
      <img
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        ngProjectAs="card-image" />
    </app-card>

    <ng-template #teacher let-item>
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        (deleted)="onTeacherDeleted($event)" />
    </ng-template>
  `,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers.asReadonly();

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  onTeacherAdded() {
    this.store.addOne(randTeacher());
  }

  onTeacherDeleted(id: number) {
    this.store.deleteOne(id);
  }
}
