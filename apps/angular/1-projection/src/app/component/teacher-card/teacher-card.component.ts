import { Component, OnInit } from '@angular/core';
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
    <ng-template #teacherTemplate let-teacher>
      <app-list-item (deleteEventEmitter)="deleteItem(teacher.id)">
        <ng-container item-body>{{ teacher.firstName }}</ng-container>
      </app-list-item>
    </ng-template>
    <app-card
      [list]="teachers"
      [templateRef]="teacherTemplate"
      customClass="bg-light-red">
      <ng-container card-header>
        <img src="assets/img/teacher.png" width="200px" />
      </ng-container>
      <ng-container card-footer>
        <button
          style="width: 100%;"
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addItem()">
          Add
        </button>
      </ng-container>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
  standalone: true,
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.elements$.subscribe((t) => (this.teachers = t));
  }

  addItem(): void {
    const teacher = randTeacher();
    this.store.addOne(teacher);
  }

  deleteItem(id: number): void {
    this.store.deleteOne(id);
  }
}
