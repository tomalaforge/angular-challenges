import { Component, OnInit, Signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      (delete)="delete($event)"
      customClass="bg-light-red">
      <img cardImage src="assets/img/teacher.png" width="200px" />
      <button
        cardActionButton
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewTeacher()">
        Add
      </button>
      <ng-template #listTemplateRef let-item>
        <p>{{ item.firstName }}</p>
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
  imports: [CardComponent],
  encapsulation: ViewEncapsulation.None,
})
export class TeacherCardComponent implements OnInit {
  teachers: Signal<Teacher[]> = toSignal(this.store.teachers$, {
    initialValue: [],
  });

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
  delete(id: number) {
    this.store.deleteOne(id);
  }
}
