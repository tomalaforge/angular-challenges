import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardContentDirective } from '../../ui/card/card-content.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card customClass="bg-light-green">
    <img cardImage src="assets/img/student.webp" width="200px" />

    <ng-template [cardContent]="students$ | async" let-student>
      <app-list-item (deleteEvent)="deleteStudent(student.id)">
        {{ student.firstname }}
      </app-list-item>
    </ng-template>

    <ng-container ngProjectAs="[actions]">
      <button
        class="p-2 bg-blue-300 border border-blue-500 rounded-sm"
        (click)="addNewStudent()">
        Add
      </button>
    </ng-container>
  </app-card>`,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe, CardContentDirective],
})
export class StudentCardComponent implements OnInit {
  students$ = this.store.students$;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
