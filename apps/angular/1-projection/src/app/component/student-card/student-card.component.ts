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
import { StudentStore } from '../../data-access/student.store';
import { CardActions } from '../../model';
import {
  CardComponent,
  CardSectionDirective,
  ListItemComponent,
} from '../../ui';
@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      customClass="bg-light-green"
      [cardItemTemplate]="cardItemTemplate">
      <img
        cardSection="header"
        ngSrc="assets/img/student.webp"
        width="200"
        height="200" />

      <ng-template #cardItemTemplate let-student>
        <app-list-item
          [name]="student.firstName"
          [id]="student.id"
          (deleteEvent)="onDeleteItem($event)"></app-list-item>
      </ng-template>

      <button
        cardSection="footer"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddNewItem()">
        Add
      </button>
    </app-card>
  `,
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    CardSectionDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit, CardActions {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(StudentStore);

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
