import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';

import {
  CardComponent,
  ListItemTemplateMarkerDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students$ | async"
      (addNew)="onAddNewItem()"
      class="bg-light-green">
      <img card-image src="assets/img/student.webp" width="200px" />

      <ng-template listItemTemplateMarker let-student>
        <app-list-item [id]="student.id" (delete)="onDeleteItem($event)">
          {{ student.firstname }}
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
    AsyncPipe,
    CardComponent,
    ListItemComponent,
    ListItemTemplateMarkerDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  students$ = this.store.students$;
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  onAddNewItem() {
    this.store.addOne(randomStudent());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
