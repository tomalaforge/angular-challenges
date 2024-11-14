import { NgStyle } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardModel } from '../../model/card.model';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teacherCards()"
      (addNewItem)="this.addTeacher()"
      class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" alt="teacher" />
      <ng-template [cardRow]="teacherCards()" let-teacher>
        <app-list-item
          [id]="teacher.id"
          (deleteItem)="this.deleteTeacher(teacher.id)">
          {{ teacher.name }}
        </app-list-item>
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
  imports: [CardComponent, NgStyle, CardRowDirective, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  teacherCards = computed(() =>
    this.store
      .teachers()
      .map((value) => ({ id: value.id, name: value.firstName }) as CardModel),
  );

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
