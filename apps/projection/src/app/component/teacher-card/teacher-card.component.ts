import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers$ | async"
    [type]="cardType"
    customClass="bg-light-red"></app-card>`,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers$!: Observable<Teacher[]>;
  cardType = CardType.TEACHER;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.teachers$ = this.store.teachers$;
  }
}
