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
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" customClass="bg-light-green">
      <div card-header class="flex flex-col items-center">
        <img
          ngSrc="assets/img/student.webp"
          width="200"
          height="200"
          alt="Students list view banner"
          priority />
      </div>

      <ng-template #itemTemplate let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          [type]="cardType"
          (emitDelete)="deleteSingle($event)" />
      </ng-template>

      <div card-action>
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addNew()">
          Add
        </button>
      </div>
    </app-card>
  `,
  styles: [
    `
      :host {
        --card-bg: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private readonly studentStore = inject(StudentStore);

  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNew(): void {
    this.studentStore.addOne(randStudent());
  }

  deleteSingle(id: number): void {
    this.studentStore.deleteOne(id);
  }
}
