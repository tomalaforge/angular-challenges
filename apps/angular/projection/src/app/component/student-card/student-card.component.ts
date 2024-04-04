import { NgOptimizedImage } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    ListItemComponent,
    CardListItemDirective,
    NgOptimizedImage,
  ],
})
export class StudentCardComponent {
  public students: Signal<Array<Student>> = toSignal(
    this.http.fetchStudents$.pipe(
      tap((s) => this.store.addAll(s)),
      switchMap(() => this.store.students$),
    ),
    { initialValue: [] as Student[] },
  );

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  public addStudent(): void {
    this.store.addOne(randStudent());
  }

  public delete(id: number): void {
    this.store.deleteOne(id);
  }
}
