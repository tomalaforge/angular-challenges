import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  template: `
    <app-card
      [list]="teachers()"
      (newItem)="addTeacher()"
      (deleteItem)="deleteTeacher($event)"
      customClass="bg-light-red">
      <img
        ngProjectAs="img"
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="teacher" />

      <ng-template let-item="item">
        {{ item.firstName }}
        <button (click)="deleteTeacher(item.id)">
          <img
            class="h-5"
            ngSrc="assets/svg/trash.svg"
            width="200"
            height="200"
            alt="trash" />
        </button>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CardComponent, NgOptimizedImage],
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
