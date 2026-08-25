import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  WritableSignal,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      customClass="bg-light-green"
      [list]="students()"
      [template]="listItem"
      (addNewItem)="addNewItem()">
      <img
        card-header
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt="" />
    </app-card>

    <ng-template #listItem let-item>
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        (deleteItem)="deleteItem($event)" />
    </ng-template>
  `,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http: FakeHttpService = inject(FakeHttpService);
  private store: StudentStore = inject(StudentStore);

  protected students: WritableSignal<Student[]> = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  public addNewItem(): void {
    this.store.addOne(randStudent());
  }

  public deleteItem(id: number): void {
    this.store.deleteOne(id);
  }
}
