import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardImageTemplateDirective } from '../../directive/card-image-template.directive';
import { ListItemTemplateDirective } from '../../directive/list-item-template-directive';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      customClass="bg-light-green"
      (addNewItem)="onAddStudentItem()">
      <ng-template cardImageTemplate>
        <img src="assets/img/student.webp" width="200px" />
      </ng-template>

      <ng-template listItemTemplate let-item>
        <app-list-item
          [id]="item.id"
          [name]="getStudentName(item)"
          (deleteItem)="onDeleteItem($event)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    CardImageTemplateDirective,
    ListItemComponent,
    ListItemTemplateDirective,
  ],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit() {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }

  getStudentName({ firstName, lastName }: Student): string {
    return `${firstName} ${lastName}`;
  }

  onAddStudentItem() {
    this.store.addOne(randStudent());
  }
}
