import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemTemplateDirective } from '../../directives/list-item-template.directive';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students"
    imageUrl="assets/img/student.webp"
    (addNewItem)="onAddNewItem()"
    (deleteItem)="onDeleteItem($event)">
    <ng-template [appListItemTemplate] let-item>
      {{ item.firstname }}
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      :host {
        --card-background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemTemplateDirective],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  onAddNewItem() {
    this.store.addOne(randStudent());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
