import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent, ItemRefDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card (addNewItem)="addTeacher()" [list]="teachers()">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" priority />
      <ng-template itemRef let-item>
        <app-list-item (onDelete)="deleteTeacher(item.id)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  host: {
    class: 'flex justify-center p-4',
  },
  imports: [
    CardComponent,
    ListItemComponent,
    NgOptimizedImage,
    ItemRefDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
  addTeacher() {
    this.store.addOne(randTeacher());
  }
  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
