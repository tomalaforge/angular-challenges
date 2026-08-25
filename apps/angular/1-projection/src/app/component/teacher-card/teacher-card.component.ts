import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    <app-card
      class="bg-light-red"
      [items]="teachers()"
      (addNew)="handleAddNew()">
      <img src="assets/img/teacher.png" alt="student" width="200px" />

      <ng-template [cardRow]="teachers()" let-teacher>
        <app-list-item (delete)="handleDelete(teacher.id)">
          {{ teacher.firstName }}
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class TeacherCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  constructor() {
    this.http.fetchTeachers$.subscribe(this.store.addAll);
  }

  handleAddNew(): void {
    this.store.addOne(randTeacher());
  }

  handleDelete(id: number): void {
    this.store.deleteOne(id);
  }
}
