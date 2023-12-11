import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardItemContentDirective } from '../../ui/card/card-item-content.directive';
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-teacher-card',
  template: ` <app-card
    [list]="teachers()"
    class="bg-light-red"
    (addItem)="addNewTeacher()">
    <img src="assets/img/teacher.png" width="200px" cardImage />
    <ng-template let-teacher appCardItemContent>
      <app-list-item (deleteItem)="deleteTeacher(teacher.id)">
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
  imports: [CardComponent, ListItemComponent, CardItemContentDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers = toSignal(this.store.teachers$);

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
