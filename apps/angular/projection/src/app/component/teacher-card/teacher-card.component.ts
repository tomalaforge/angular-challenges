import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      customClass="bg-light-red"
      [list]="teachers()"
      (addItem)="addNewItem()">
      <img src="assets/img/teacher.png" width="200px" image />

      <ng-template cardListItem let-teacher>
        <app-list-item (deleteItem)="onDeleteItem(teacher.id)">
          <p>{{ teacher.firstName }}</p>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers = this.teacherStore.teachers;

  constructor(
    private http: FakeHttpService,
    private teacherStore: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.teacherStore.addAll(t));
  }

  addNewItem() {
    this.teacherStore.addOne(randTeacher());
  }

  onDeleteItem(id: number) {
    this.teacherStore.deleteOne(id);
  }
}
