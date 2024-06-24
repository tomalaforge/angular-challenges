import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: ` <app-card
    [list]="teachers"
    (addItem)="onAddItem()"
    customClass="bg-light-red">
    <ng-template #rowRef let-teacher>
      <app-list-item
        [id]="teacher.id"
        [name]="teacher.firstname"
        (deleteItem)="onDeleteItem($event)"></app-list-item>
    </ng-template>
    <img src="assets/img/teacher.png" width="200px" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  onAddItem() {
    this.store.addOne(randTeacher());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
