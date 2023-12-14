import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import {
  CardComponent,
  ListItemTemplateMarkerDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers$ | async"
      (addNew)="onAddNewItem()"
      class="bg-light-red">
      <img card-image src="assets/img/teacher.png" width="200px" />
      <ng-template listItemTemplateMarker let-teacher>
        <app-list-item [id]="teacher.id" (delete)="onDeleteItem($event)">
          {{ teacher.firstname }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    CardComponent,
    ListItemComponent,
    ListItemTemplateMarkerDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  teachers$ = this.store.teachers$;
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  onAddNewItem() {
    this.store.addOne(randomTeacher());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
