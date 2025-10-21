import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { Store } from '../../data-access/store';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      class="bg-light-green"
      [itemTemplate]="itemTemplate"
      (onAddNewItem)="addNewItem()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />
    </app-card>

    <ng-template #itemTemplate let-item>
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        [type]="cardType"
        (onDeleteItem)="deleteStudent($event)"></app-list-item>
    </ng-template>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: Store, useExisting: StudentStore }],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
