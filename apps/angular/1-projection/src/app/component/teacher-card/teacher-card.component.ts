import { Component, OnInit, signal } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [listTemplate]="listTemplate"
      customClass="bg-light-red">
      <img ngProjectAs="image" src="assets/img/teacher.png" width="200px" />
      <button
        ngProjectAs="addBtn"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
    <ng-template #listTemplate let-item>
      <app-list-item>
        {{ item.firstName }}
        <button ngProjectAs="deleteBtn" (click)="delete(item.id)">
          <img class="h-5" src="assets/svg/trash.svg" />
        </button>
      </app-list-item>
    </ng-template>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers = signal<Teacher[]>([]);
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => this.teachers.set(t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
