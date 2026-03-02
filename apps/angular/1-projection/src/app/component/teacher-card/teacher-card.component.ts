import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [itemTemplate]="teacherItem"
      [onAdd]="addTeacher">
      <!--la img y el p, como están dentro del componente se visualizará en el ng-content del componente card-->
      <p>Titulo para teacher</p>
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />
    </app-card>

    <!--Template para teacher que se mostrará dentro de app-card -->
    <ng-template #teacherItem let-item>
      <!--encargado de repetir los list-item es el card, encargado de decidir cómo se pinta es el teacher-card-->
      <app-list-item
        [id]="item.id"
        [name]="item.firstName"
        (delete)="deleteTeacher($event)"></app-list-item>
    </ng-template>
  `,
  // styles: [
  //   `
  //     ::ng-deep .bg-light-red {
  //       background-color: rgba(250, 0, 0, 0.1);
  //     }
  //   `,
  // ],
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  teacherStore = this.store;
  // cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher = () => {
    this.teacherStore.addOne(randTeacher());
  };
  deleteTeacher(id: number) {
    this.teacherStore.deleteOne(id);
  }
}
