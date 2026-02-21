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
import { CardListItemTemplateDirective } from '../../ui/card/card-list-item-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      customClass="bg-light-green"
      (onAddNewItem)="addNewStudent()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />

      <ng-template appCardListItem let-item="item">
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          (onDelete)="deleteStudent(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    CardListItemTemplateDirective,
    NgOptimizedImage,
    ListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
