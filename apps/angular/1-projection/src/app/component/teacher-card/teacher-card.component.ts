import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    <app-card [list]="teachers()" (add)="handleAdd()" class="bg-light-red">
      <img src="/assets/img/teacher.png" alt="teacher explaning sqrt of 2" />

      <ng-template #rowReference [cardRow]="teachers()" let-teacher>
        <app-list-item (remove)="handleRemove(teacher.id)">
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, ListItemComponent, CardRowDirective],
})
export class TeacherCardComponent {
  #store = inject(TeacherStore);
  #http = inject(FakeHttpService);

  teachers = this.#store.teachers;

  constructor() {
    this.#http.fetchTeachers$
      .pipe(takeUntilDestroyed())
      .subscribe((teachers) => this.#store.addAll(teachers));
  }

  handleAdd() {
    this.#store.addOne(randTeacher());
  }

  handleRemove(id: number) {
    this.#store.deleteOne(id);
  }
}
