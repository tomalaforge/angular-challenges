import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      customClass="bg-light-red"
      [itemRef]="teacherTemplate">
      <img ngProjectAs="cardImage" src="assets/img/teacher.png" width="200px" />

      <ng-template #teacherTemplate let-teacher>
        <app-list-item
          [id]="teacher.id"
          name="{{ teacher.firstName }}"
          (deleteEvent)="deleteTeacher(teacher.id)"></app-list-item>
      </ng-template>

      <button
        button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }
  addNewItem() {
    this.store.addOne(randTeacher());
    console.log(this.store);
  }
  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
