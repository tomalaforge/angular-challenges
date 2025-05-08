import { Component, computed, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      customClass="bg-color"
      [imgTitle]="cardImg"
      [list]="teachers()"
      (addNew)="addNewItem()"
      (itemId)="deleteItem($event)" />
  `,
  styles: [
    `
      :host {
        --card-background: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(TeacherStore);

  teachers = computed(() => {
    return this.store.teachers().map((item) => {
      return { ...item, name: item.firstName };
    });
  });
  cardImg = 'assets/img/teacher.png';

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
