import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardTemplateContentDirective } from '../../ui/card/card-template-content.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers$ | async"
    [type]="cardType"
    customClass="bg-light-red"
    (addItemEvent)="addTeacher()">
    <img src="assets/img/teacher.png" width="200px" />
    <ng-template let-teacher appCardTemplateContent>
      <app-list-item
        [id]="teacher?.id"
        [name]="teacher?.firstname"
        (deleteItem)="deleteTeacher($event)"></app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      :host {
        --card-bg-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    ListItemComponent,
    CardTemplateContentDirective,
    AsyncPipe,
  ],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;
  teachers$!: Observable<Teacher[]>;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.teachers$ = this.store.teachers$;
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
