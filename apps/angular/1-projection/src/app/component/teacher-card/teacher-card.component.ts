// teacher-card.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardRowDirective],
  template: `
    <app-card [list]="teachers()" customClass="bg-red-500/10">
      <!-- 1. Projected Image -->
      <img
        src="assets/img/teacher.png"
        width="200"
        height="200"
        alt="teacher" />

      <!-- 2. Row Template passed via CardRowDirective -->
      <ng-template cardRow let-teacher>
        <app-list-item (deleted)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>

      <!-- 3. Projected Add Button -->
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addTeacher()">
        Add
      </button>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  // teachers = this.store.teachers;
  // cardType = CardType.TEACHER;

  readonly teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
