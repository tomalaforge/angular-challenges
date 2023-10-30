import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardDirective } from '../../ui/card/card.directive';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card class="bg-light-green" (addItem)="addStudent()">
      <img card-header src="assets/img/student.webp" width="200px" />
      <app-list-item
        *cardContent="students$ | async; let student"
        (delete)="deleteStudent(student.id)">
        {{ student.firstname }}
      </app-list-item>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe, CardDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit, DoCheck {
  students$: Observable<Student[]> = this.store.students$;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  ngDoCheck() {
    console.log('Checking changes on Student card');
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
