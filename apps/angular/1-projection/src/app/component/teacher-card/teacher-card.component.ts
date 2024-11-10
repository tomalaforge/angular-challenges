import { NgStyle } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardModel } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teacherCards()"
      (addNewItem)="this.addItem()"
      class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" alt="teacher" />
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
  imports: [CardComponent, NgStyle],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  teachers = toSignal(this.store.teachers$, { initialValue: [] });
  teacherCards = computed(() =>
    this.teachers().map(
      (value) => ({ id: value.id, name: value.firstName }) as CardModel,
    ),
  );

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addItem(): void {
    this.store.addOne(randTeacher());
  }
}
