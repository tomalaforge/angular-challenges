import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    <app-card
      class="bg-light-green"
      [items]="students()"
      (addNew)="handleAddNew()">
      <img src="assets/img/student.webp" alt="student" width="200px" />

      <ng-template [cardRow]="students()" let-student>
        <app-list-item (delete)="handleDelete(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, CardRowDirective, ListItemComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  constructor() {
    this.http.fetchStudents$.subscribe(this.store.addAll);
  }

  handleAddNew(): void {
    this.store.addOne(randStudent());
  }

  handleDelete(id: number): void {
    this.store.deleteOne(id);
  }
}
