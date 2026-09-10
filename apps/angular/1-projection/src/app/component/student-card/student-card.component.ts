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
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      (addEvent)="addNewStudent()"
      backgroundColor="rgba(0, 250, 0, 0.1)"
      customClass="bg-light-green">
      <img
        head-img
        src="assets/img/student.webp"
        width="200"
        height="200"
        alt=""
        class="img" />

      <ng-template #itemContent let-item let-type="type">
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          (deleted)="deleteStudent($event)" />
      </ng-template>
    </app-card>
  `,
  styles: [],
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

  addNewStudent = () => {
    this.store.addOne(randStudent());
  };

  deleteStudent = (id: number) => {
    this.store.deleteOne(id);
  };
}
