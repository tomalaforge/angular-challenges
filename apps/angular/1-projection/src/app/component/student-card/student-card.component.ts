import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" (add)="handleAdd()" class="bg-light-green">
      <img src="/assets/img/student.webp" alt="students with books" />

      <ng-template #rowReference [cardRow]="students()" let-student>
        <app-list-item (remove)="handleRemove(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: `
    .bg-light-green {
      background-color: rgba(0, 250, 0, 0.1);
    }
  `,
  imports: [CardComponent, ListItemComponent, CardRowDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
  #http = inject(FakeHttpService);
  #store = inject(StudentStore);

  students = this.#store.students;

  constructor() {
    this.#http.fetchStudents$
      .pipe(takeUntilDestroyed())
      .subscribe((students) => this.#store.addAll(students));
  }

  handleAdd() {
    this.#store.addOne(randStudent());
  }

  handleRemove(id: number) {
    this.#store.deleteOne(id);
  }
}
