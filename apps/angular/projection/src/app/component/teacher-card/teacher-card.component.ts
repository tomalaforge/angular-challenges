import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" customClass="rgba(250, 0, 0, 0.1)">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template #deleteButton let-id let-firstName="firstName">
        {{ firstName }}
        <button (click)="deleteTeacher(id)">
          <img class="h-5" src="assets/svg/trash.svg" />
        </button>
      </ng-template>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addTeacher()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, NgTemplateOutlet],
})
export class TeacherCardComponent implements OnInit {
  teachers: WritableSignal<Teacher[]> = signal([]);

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.store.teachers$.subscribe((t) => this.teachers.set(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
