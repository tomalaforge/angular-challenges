import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Observable, tap } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <ng-container *ngIf="fetchedStudents$ | async as fetchedStudents">
      <ng-container *ngIf="students$ | async as students">
        <app-card
          [list]="students"
          (delete)="delete($event)"
          customClass="bg-light-green">
          <img
            alt="student"
            cardImage
            src="assets/img/student.webp"
            width="200px" />
          <button
            addNewItemBtn
            class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
            (click)="addNewItem()">
            Add
          </button>
        </app-card>
      </ng-container>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule, NgIf, CardComponent],
})
export class StudentCardComponent {
  private store = inject(StudentStore);
  private http = inject(FakeHttpService);

  students$: Observable<Student[]> = this.store.students$;
  fetchedStudents$: Observable<Student[]> = this.http.fetchStudents$.pipe(
    tap((s) => this.store.addAll(s))
  );

  addNewItem() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
