import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { NgTemplateOutlet } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      [imgUrl]="'assets/img/student.webp'"
      (newItem)="onNewItem()">
      <ng-template #rowTemplate let-student>
        <app-list-item
          [name]="student.firstname + ' ' + student.lastname"
          [id]="student.id"
          (itemDelete)="onItemDelete($event)" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      :host {
        --card-background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgTemplateOutlet, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  onItemDelete(id: number) {
    this.store.deleteOne(id);
  }

  onNewItem() {
    this.store.addOne(randStudent());
  }
}
