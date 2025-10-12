import { Component, OnInit, computed, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardListItem } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teacherListItems()"
      class="bg-light-red"
      (addNewItemEvent)="handleAddNewItemEvent()"
      (deleteItemEvent)="handleDeleteItemEvent($event)">
      <div card-img>
        <img src="assets/img/teacher.png" width="200px" />
      </div>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teacherListItems = computed<CardListItem[]>(() =>
    this.store
      .teachers()
      .map((teacher) => ({ name: teacher.firstName, id: teacher.id })),
  );

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  handleAddNewItemEvent() {
    this.store.addOne(randTeacher());
  }

  handleDeleteItemEvent(id: number) {
    this.store.deleteOne(id);
  }
}
