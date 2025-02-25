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
import { ListItemDirective } from '../../ui/list-item/list-item.directive';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      customClass="bg-light-green"
      (addNewItem)="addNewStudent()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />

      <ng-template appListItem let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          [type]="item.type" />
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    ListItemDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewStudent(): void {
    this.store.addOne(randStudent());
  }
}
