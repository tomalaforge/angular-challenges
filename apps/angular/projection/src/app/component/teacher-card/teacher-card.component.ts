import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="(teachers$ | async) ?? []"
    (add)="addNewItem()"
    class="bg-light-red">
    <img appCardImage src="assets/img/teacher.png" width="200px" />
    <ng-template appCardItem let-item>
      <app-list-item (delete)="delete(item.id)">
        {{ item.firstname }}
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
  imports: [
    CardComponent,
    NgIf,
    CardItemDirective,
    ListItemComponent,
    AsyncPipe,
  ],
})
export class TeacherCardComponent implements OnInit {
  teachers$ = this.store.teachers$;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
