import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      (Add)="addNewStudent()"
      customClass="bg-light-green">
      <img src="assets/img/student.webp" width="200" height="200" />
      <ng-template #rowTemplate let-Student>
        <app-list-item (delete)="deleteStudent(Student.id)">
          {{ Student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
  addNewStudent() {
    this.store.addOne(randStudent());
  }
  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
