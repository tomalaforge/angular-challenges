import {Component, OnInit} from '@angular/core';
import {FakeHttpService, randStudent} from '../../data-access/fake-http.service';
import {StudentStore} from '../../data-access/student.store';
import {Student} from '../../model/student.model';
import {CardComponent} from '../../ui/card/card.component';
import {ListItemComponent} from '../../ui/list-item/list-item.component';
import {AsyncPipe} from "@angular/common";
import {Observable} from 'rxjs';
import {ListItemTemplateDirective} from "../../directive/list-item-template.directive";

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students$ | async"
    (add)="addStudent()"
    class="bg-light-green"
  >
    <img
      src="assets/img/student.webp"
      width="200px"
    />
  <ng-template list-item-template let-student>
      <app-list-item
        [name]="student.firstname"
        (delete)="delete(student.id)"
      ></app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe, ListItemTemplateDirective],
})
export class StudentCardComponent implements OnInit {

  readonly students$: Observable<Student[]> = this.store.students$;

  constructor(private readonly http: FakeHttpService, private readonly store: StudentStore) {
  }

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent(): void {

    this.store.addOne(randStudent());
  }

  delete(id: number): void {
    this.store.deleteOne(id);
  }
}
