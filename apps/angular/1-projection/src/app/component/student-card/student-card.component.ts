import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { RowItemDirective } from '../../ui/card/row-item.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      class="bg-light-green"
      (addItem)="onAddNewItem()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template [rowItem]="students()" let-item>
        <app-list-item
          [name]="item.firstName"
          (deleteItem)="onDeleteItem(item.id)"></app-list-item>
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
  imports: [CardComponent, RowItemDirective, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  onAddNewItem() {
    this.store.addOne(randStudent());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
