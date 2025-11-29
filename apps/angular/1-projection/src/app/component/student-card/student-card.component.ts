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
import { CardComponent, ItemRefDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card (addNewItem)="addStudent()" [list]="students()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" priority />
      <ng-template itemRef let-item>
        <app-list-item (onDelete)="deleteStudent(item.id)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  host: {
    class: 'flex justify-center p-4',
  },
  imports: [
    CardComponent,
    ListItemComponent,
    ItemRefDirective,
    NgOptimizedImage,
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

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }

  addStudent() {
    this.store.addOne(randStudent());
  }
}
