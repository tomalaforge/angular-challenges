import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: ` <app-card
    [list]="teachers()"
    customClass="bg-light-red"
    [itemRef]="teacherTemplate">
    <img image src="/assets/img/teacher.png" width="200px" />

    <ng-template #teacherTemplate let-teacher>
      <app-list-item
        [id]="teacher.id"
        name="{{ teacher.firstname }}"
        (deleteEvent)="deleteTeacher(teacher.id)">
      </app-list-item>
    </ng-template>

    <button
      button
      class="border border-red-500 bg-red-300 p-2 rounded-sm"
      (click)="addNewTeacher()">
      Add
    </button>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers = this.store.teachers;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
