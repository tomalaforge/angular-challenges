import { Component, OnInit, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [type]="cardType"
      customClass="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: WritableSignal<Student[]> = <WritableSignal<Student[]>>toSignal(
    this.http.fetchStudents$.pipe(
      tap((s) => this.store.addAll(s)),
      switchMap(() => this.store.students$),
    ),
  );

  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {}
}
