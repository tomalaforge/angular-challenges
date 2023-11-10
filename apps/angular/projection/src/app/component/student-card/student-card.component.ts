import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { ListItemTemplateDirective } from '../../directive/list-item-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="(store.students$ | async) ?? []"
      class="bg-light-green"
      (addItem)="addItem()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template let-item list-item-template>
        <app-list-item
          [name]="item.firstname"
          (deleteItem)="deleteItem(item.id)">
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    ListItemComponent,
    ListItemTemplateDirective,
    AsyncPipe,
  ],
})
export class StudentCardComponent implements OnInit {
  constructor(
    private readonly http: FakeHttpService,
    public readonly store: StudentStore
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
