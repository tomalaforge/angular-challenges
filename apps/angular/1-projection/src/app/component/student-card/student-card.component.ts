import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
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
      [headerTemplate]="studentHeaderTemplate"
      class="bg-light-green"></app-card>

    <ng-template #studentHeaderTemplate let-list="list">
      <div class="student-header">
        <img src="assets/img/student.webp" alt="Student Image" width="200px" />
      </div>
    </ng-template>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
        display: block;
      }
    `,
  ],
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;
  @ViewChild('studentHeaderTemplate') studentHeaderTemplate!: TemplateRef<any>;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }
}
