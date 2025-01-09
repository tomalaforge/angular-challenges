import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <ng-template #studentTemplate let-student>
      <app-list-item (deleteEventEmitter)="deleteItem(student.id)">
        <ng-container item-body>{{ student.firstName }}</ng-container>
      </app-list-item>
    </ng-template>
    <app-card
      [list]="students"
      [templateRef]="studentTemplate"
      customClass="bg-light-green">
      <ng-container card-header>
        <img src="assets/img/student.webp" width="200px" />
      </ng-container>
      <ng-container card-footer>
        <button
          style="width: 100%;"
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addItem()">
          Add
        </button>
      </ng-container>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
  standalone: true,
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.elements$.subscribe((s) => (this.students = s));
  }

  deleteItem(id: number): void {
    this.store.deleteOne(id);
  }

  addItem(): void {
    const element = randStudent();
    this.store.addOne(element);
  }

  protected readonly JSON = JSON;
}
