import { Component, OnInit, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" [type]="cardType" customClass="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: WritableSignal<Teacher[]> = <WritableSignal<Teacher[]>>toSignal(
    this.http.fetchTeachers$.pipe(
      tap((t) => this.store.addAll(t)),
      switchMap(() => this.store.teachers$),
    ),
  );

  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {}
}
