import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers" customClass="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" image />

      <ng-template cardListItem let-student>
        <app-list-item
          [name]="student.firstName"
          [id]="student.id"
          (deleteItem)="onDeleteItem($event)"></app-list-item>
      </ng-template>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private teacherStore: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.teacherStore.addAll(t));

    this.teacherStore.teachers$.subscribe((t) => (this.teachers = t));
  }

  addNewItem() {
    this.teacherStore.addOne(randTeacher());
  }

  onDeleteItem(id: number) {
    this.teacherStore.deleteOne(id);
  }
}
