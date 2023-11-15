import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { RowTemplateDirective } from '../../row-template.directive';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card [list]="teachers | async" class="bg-light-red">
    <img src="assets/img/teacher.png" width="200px" />
    <ng-template appRowTemplate let-teacher>
      <app-list-item (delete)="deleteTeacher(teacher.id)">
        {{ teacher.firstname }}
      </app-list-item>
    </ng-template>
    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="addNewItem()">
      Add
    </button>
  </app-card>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardComponent, AsyncPipe, ListItemComponent, RowTemplateDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers: Observable<Teacher[]> = this.store.teachers$;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
