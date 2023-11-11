import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { NgForOf, NgIf } from '@angular/common';
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students()"
    (add)="addNewItem()"
    class="bg-light-green">
    <img appCardImage src="assets/img/student.webp" width="200px" />
    <ng-template appCardItem let-item>
      <app-list-item (delete)="delete(item.id)">
        {{ item.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgIf, CardItemDirective, ListItemComponent, NgForOf],
})
export class StudentCardComponent implements OnInit {
  students = toSignal(this.store.students$, { initialValue: [] as Student[] });

  constructor(private http: FakeHttpService, private store: StudentStore) {}

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
