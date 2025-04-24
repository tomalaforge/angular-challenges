import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" customClass="bg-light-red">
      <img
        ngProjectAs="card-img"
        src="assets/img/teacher.png"
        width="200"
        height="200" />
      <ng-template #listTemplate let-teacher>
        <app-list-item>
          {{ teacher.firstName }}
          <button
            (click)="deleteTeacher(teacher.id)"
            ngProjectAs="delete-button">
            <img class="h-5" src="assets/svg/trash.svg" alt="icon trash" />
          </button>
        </app-list-item>
      </ng-template>
      <button
        (click)="addTeacher()"
        ngProjectAs="add-button"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2">
        Add
      </button>
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
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }
}
