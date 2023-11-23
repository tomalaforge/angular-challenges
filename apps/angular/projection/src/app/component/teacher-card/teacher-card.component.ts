import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-card [list]="store.teachers$ | async" (add)="addTeacher()">
    <img src="assets/img/student.webp" width="200px" />

    <ng-template #itemTemplate let-teacher>
      @if (typedTeacher(teacher); as teacher) {
        <app-list-item (delete)="deleteTeacher(teacher)">
          {{ teacher.firstname }}
        </app-list-item>
      }
    </ng-template>
  </app-card>`,
  styles: [
    `
      :host {
        --card-background-color: rgba(255, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CommonModule],
})
export class TeacherCardComponent implements OnInit {
  constructor(
    private http: FakeHttpService,
    protected store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(teacher: Teacher) {
    this.store.deleteOne(teacher.id);
  }

  typedTeacher(teacher: Teacher): Teacher {
    return teacher;
  }
}
