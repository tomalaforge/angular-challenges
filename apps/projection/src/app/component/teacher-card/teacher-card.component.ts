import {Component, OnInit} from '@angular/core';
import {FakeHttpService, randTeacher} from '../../data-access/fake-http.service';
import {TeacherStore} from '../../data-access/teacher.store';
import {Teacher} from '../../model/teacher.model';
import {CardComponent} from '../../ui/card/card.component';
import {ListItemComponent} from '../../ui/list-item/list-item.component';
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {ListItemTemplateDirective} from "../../directive/list-item-template.directive";

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers$ | async"
    (add)="addTeacher()"
    class="bg-light-red"
  >
    <img
      src="assets/img/teacher.png"
      width="200px"
    />
  <ng-template list-item-template let-teacher>
      <app-list-item
        [name]="teacher.firstname"
        (delete)="delete(teacher.id)"
      ></app-list-item>
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
  imports: [CardComponent, ListItemComponent, AsyncPipe, ListItemTemplateDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers$: Observable<Teacher[]> = this.store.teachers$;

  constructor(private readonly http: FakeHttpService, private readonly store: TeacherStore) {
  }

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  delete(id: number): void {
    this.store.deleteOne(id);
  }
}
