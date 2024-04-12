import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
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
  public students = this.store.students;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {
    this.http.fetchStudents$.pipe(tap((s) => this.store.addAll(s))).subscribe();
  }

  public addStudent(): void {
    this.store.addOne(randStudent());
  }

  public delete(id: number): void {
    this.store.deleteOne(id);
  }
}
