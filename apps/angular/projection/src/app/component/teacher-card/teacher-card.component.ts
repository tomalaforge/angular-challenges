import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { NgIf } from '@angular/common';
import { Teacher } from '../../model/teacher.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers()"
    (addItem)="addTeacher()"
    (deleteItem)="removeTeacher($event)"
    customClass="bg-light-red">
    <img src="assets/img/teacher.png" width="200px" />
    <ng-template let-item="item">
      {{ item.firstname }}
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  teachers = toSignal<Teacher[], Teacher[]>(this.store.data$, {
    initialValue: [],
  });

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  removeTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
