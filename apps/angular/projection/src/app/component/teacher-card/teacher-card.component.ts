import { Component, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      (AddNewRecordEmitter)="handleAddNewTeacher()">
      <img src="assets/img/teacher.png" width="200px" image />
      <ng-template #itemTemplate let-item>
        <app-list-item
          [id]="item.id"
          (DeleteNewRecordEmitter)="handleDeleteTeacher($event)">
          <p>{{ item.firstName }} {{ item.lastName }}</p>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Signal<Teacher[]> = signal([])

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.teachers = this.store.cities
  }

  handleDeleteTeacher(id: number) {
    this.store.deleteOne(id);
  }

  handleAddNewTeacher() {
    this.store.addOne(randTeacher());
  }
}
