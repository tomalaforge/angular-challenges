import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardModule } from '../../ui/card/card.module';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card class="bg-light-green" [list]="students" (addItem)="addItem()">
      <img src="assets/img/student.webp" width="200" />

      <ng-template [cardItem]="students" let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.firstName"
          (deleteItem)="deleteItem(item.id)" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardModule, ListItemComponent],
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

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addItem(): void {
    this.store.addOne(randStudent());
  }

  deleteItem(index: number): void {
    this.store.deleteOne(index);
  }
}
