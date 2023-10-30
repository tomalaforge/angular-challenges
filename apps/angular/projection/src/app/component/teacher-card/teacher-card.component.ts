import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardDirective } from '../../ui/card/card.directive';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-teacher-card',
  template: ` <app-card class="bg-light-red" (addItem)="addTeacher()">
    <img card-header src="assets/img/teacher.png" width="200px" />
    <ng-template [cardContent]="teachers$ | async" let-teacher>
      <app-list-item (delete)="deleteTeacher(teacher.id)">
        {{ teacher.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe, CardDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit, DoCheck {
  teachers$ = this.store.teachers$;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  ngDoCheck() {
    console.log('Checking changes on Teacher card');
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
