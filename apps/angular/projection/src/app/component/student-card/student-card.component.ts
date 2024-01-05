import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { Store } from '../../data-access/store';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      [type]="cardType"
      customClass="bg-green-200/50"
      showingProp="firstName">
      <img src="assets/img/student.webp" alt="" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
  providers: [{ provide: Store, useExisting: StudentStore }],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.items$.subscribe((s: Student[]) => (this.students = s));
  }
}
