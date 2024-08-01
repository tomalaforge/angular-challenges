import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card class="bg-light-red" [items]="teachers()" (add)="addTeacher()">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template [cardRow]="teachers()" let-teacher>
        <app-list-item (delete)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }} {{ teacher.lastName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardRowDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent {
  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {
    this.http.fetchTeachers$
      .pipe(takeUntilDestroyed())
      .subscribe((t) => this.store.addAll(t));
  }

  teachers = this.store.teachers;
  addTeacher() {
    this.store.addOne(randTeacher());
  }
  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
