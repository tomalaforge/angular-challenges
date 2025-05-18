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
import { CardComponent, CardListDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      (addNewItem)="addNewItem()"
      [list]="students()"
      class="bg-light-green">
      <img
        card-header
        ngSrc="assets/img/student.webp"
        width="200"
        height="200" />
      <ng-template card-list-item let-student>
        <app-list-item (deleteItem)="deleteItem(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    CardListDirective,
    ListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  public readonly store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
