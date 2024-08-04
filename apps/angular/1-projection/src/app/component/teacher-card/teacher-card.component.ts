import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    <ng-template #itemTemplate let-data="data">
      {{ data.firstName }}
    </ng-template>
    <app-card
      [list]="teachers"
      [addNewItem]="addNewItem"
      [deleteItem]="deleteItem"
      [itemTemplate]="itemTemplate"
      customClass="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
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
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addNewItem = () => {
    this.store.addOne(randTeacher());
  };

  deleteItem = (id: number) => {
    return () => {
      this.store.deleteOne(id);
    };
  };
}
