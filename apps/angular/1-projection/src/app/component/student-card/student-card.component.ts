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
import { StoreUtilsService } from '../../data-access/store-utils.service';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemDirective } from '../../ui/list-item/list-item.directive';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" (addNewItem)="addNewStudent()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />

      <ng-template appListItem let-item>
        <app-list-item
          [name]="item.firstName + ' ' + item.lastName"
          [id]="item.id"
          [type]="item.type"
          (deleteItem)="deleteStudent(item.id)" />
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      :host {
        --card-bg-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    ListItemDirective,
  ],
  providers: [StoreUtilsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  #http = inject(FakeHttpService);
  #storeUtil = inject<StoreUtilsService<Student>>(StoreUtilsService<Student>);

  students = this.#storeUtil.getState();

  ngOnInit(): void {
    this.#http.fetchStudents$.subscribe((s: Student[]) =>
      this.#storeUtil.addAll(s),
    );
  }

  addNewStudent(): void {
    this.#storeUtil.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.#storeUtil.deleteOne(id, (student) => student.id);
  }
}
