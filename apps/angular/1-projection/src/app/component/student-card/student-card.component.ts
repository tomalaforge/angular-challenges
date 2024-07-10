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
  templateUrl: './student-card.component.html',
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, CardRowDirective, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  constructor() {
    this.http.fetchStudents$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => this.store.addAll(data));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
