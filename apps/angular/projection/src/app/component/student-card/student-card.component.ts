import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      (addNew)="onAddNewItem()"
      class="bg-light-green">
      <img card-image src="assets/img/student.webp" width="200px" />

      <app-list-item
        *ngFor="let s of students"
        [id]="s.id"
        (delete)="onDeleteItem($event)">
        {{ s.firstname }}
      </app-list-item>
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
  imports: [NgIf, NgFor, CardComponent, ListItemComponent],
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

  onAddNewItem() {
    this.store.addOne(randomStudent());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
