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
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card class="bg" [list]="store.students()" (addedNewItem)="addItem()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />

      <ng-template [app-card-list-item]="store.students()" let-item>
        <app-list-item (deleted)="store.deleteOne(item.id)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    NgOptimizedImage,
    CardComponent,
    CardListItemDirective,
    ListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  protected store = inject(StudentStore);

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addItem(): void {
    this.store.addOne(randStudent());
  }
}
