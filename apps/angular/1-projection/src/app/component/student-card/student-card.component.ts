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
      [itemTemplate]="studentsItem"
      [onAdd]="addStudent">
      <p>Titulo para student</p>
      <img ngSrc="assets/img/student.webp" width="200" height="200" />
    </app-card>

    <!--Template para teacher que se mostrará dentro de app-card -->
    <ng-template #studentsItem let-item>
      <app-list-item
        [id]="item.id"
        [name]="item.firstName"
        (delete)="deleteStudent($event)"></app-list-item>
    </ng-template>
  `,
  // styles: [
  //   `
  //     ::ng-deep .bg-light-green {
  //       background-color: rgba(0, 250, 0, 0.1);
  //     }
  //   `,
  // ],
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;
  studentsStore = this.store;
  //cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent = () => {
    this.studentsStore.addOne(randStudent());
  };
  deleteStudent(id: number) {
    this.studentsStore.deleteOne(id);
  }
}
