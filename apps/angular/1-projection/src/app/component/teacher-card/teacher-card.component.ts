import { Component, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemRefDirective } from '../../ui/list-item/list-item.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (addNewItem)="addNewItem()">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template appListItemRef let-teacher>
        <app-list-item (deleteItem)="deleteItem(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
})
export class TeacherCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  teachers = this.store.teachers;

  constructor() {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }
}
