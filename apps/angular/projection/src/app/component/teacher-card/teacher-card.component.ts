import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <ng-container *ngIf="teachers$ | async as teachers">
      <app-card
        [store]="store"
        [list]="teachers"
        [getName]="getTeacherName"
        customClass="bg-light-red">
        <img src="assets/img/teacher.png" width="200px"
      /></app-card>
    </ng-container>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, NgIf, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
})
export class TeacherCardComponent implements OnInit {
  teachers$: Observable<Teacher[]> = of([]);

  constructor(private http: FakeHttpService, public store: TeacherStore) {}

  ngOnInit(): void {
    this.teachers$ = this.http.fetchTeachers$;
  }

  getTeacherName(teacher: Teacher) {
    return teacher.firstname;
  }
}
