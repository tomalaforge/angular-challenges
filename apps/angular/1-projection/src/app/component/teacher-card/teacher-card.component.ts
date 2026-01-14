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
    <ng-template #configurableList let-item>
      <app-list-item>
        <span>{{ item.firstName }}</span>
        <button (click)="delete(item.id)">
          <img class="h-5" src="assets/svg/trash.svg" />
        </button>
      </app-list-item>
    </ng-template>
    <app-card
      [list]="teachers()"
      [customBgColor]="bgColor"
      [cardContent]="configurableList">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  teachers = this.store.teachers;
  bgColor = { 'background-color': 'rgba(250, 0, 0, 0.1)' };

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }
}
