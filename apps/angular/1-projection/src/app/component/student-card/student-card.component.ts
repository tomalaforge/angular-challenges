import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" customClass="bg-light-green">
      <img
        ngProjectAs="card-img"
        src="assets/img/student.webp"
        width="200"
        height="200" />
      <ng-template #listTemplate let-student>
        <app-list-item>
          {{ student.firstName }}
          <button
            (click)="deleteStudent(student.id)"
            ngProjectAs="delete-button">
            <img class="h-5" src="assets/svg/trash.svg" alt="icon trash" />
          </button>
        </app-list-item>
      </ng-template>
      <button
        (click)="addStudent()"
        ngProjectAs="add-button"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }

  addStudent() {
    this.store.addOne(randStudent());
  }
}
