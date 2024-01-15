import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    <app-card
      [list]="students$ | async"
      [content]="'firstName'"
      [imgTemplate]="imgTemplate"
      [buttonTemplate]="buttonTemplate"
      [deleteTemplate]="deleteTemplate"></app-card>
    <ng-template #imgTemplate>
      <img src="assets/img/student.webp" width="200px" />
    </ng-template>
    <ng-template #buttonTemplate>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </ng-template>
    <ng-template #deleteTemplate let-id>
      <button (click)="delete(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </ng-template>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, AsyncPipe],
})
export class StudentCardComponent implements OnInit {
  students$: Observable<Student[]> = this.store.students$;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
