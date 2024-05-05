import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      (addItem)="addItem()"
      customClass="bg-light-red">
      <img img-holder src="assets/img/teacher.png" width="200px" />
      <ng-template #card let-item>
        <app-list-item
          [name]="item.firstName"
          (deleteItem)="delete($event)"
          [id]="item.id"></app-list-item>
      </ng-template>
    </app-card>
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

  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  addItem() {
    this.store.addOne(randTeacher());
  }
}
