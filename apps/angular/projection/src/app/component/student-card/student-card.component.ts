import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <ng-container *ngIf="students$ | async as students">
      <app-card
        [getName]="getStudentName"
        [store]="store"
        [list]="students"
        customClass="bg-light-green">
        <img src="assets/img/student.webp" width="200px" />
      </app-card>
    </ng-container>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgIf, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
})
export class StudentCardComponent implements OnInit {
  students$: Observable<Student[]> = of([]);

  constructor(private http: FakeHttpService, public store: StudentStore) {}

  ngOnInit(): void {
    this.students$ = this.http.fetchStudents$;
  }

  getStudentName(student: Student) {
    return student.firstname;
  }
}
