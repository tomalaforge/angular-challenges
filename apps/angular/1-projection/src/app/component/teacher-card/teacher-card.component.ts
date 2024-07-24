import { Component, OnInit } from '@angular/core';
import { FakeHttpService, randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from "../../ui/list-item/list-item.component";

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      [imgTemplate]="teacherImg"
      [itemTemplate]="teacherItem"
      [actionTemplate]="teacherAction"
      customClass="bg-light-red">
    </app-card>
    <ng-template #teacherImg>
      <img
        src="assets/img/teacher.png"
        width="200px" />
    </ng-template>
    <ng-template let-item #teacherItem>
      <app-list-item
        [id]="item.id"
        [name]="item.firstName"
        (deleteItemEvent)="delete($event)">
      </app-list-item>
    </ng-template>
    <ng-template #teacherAction>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </ng-template>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
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

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  delete(id: number){
    this.store.deleteOne(id);
  }
}
