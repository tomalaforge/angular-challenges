import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" [type]="cardType" customClass="teacher-card">
      <!-- Header Template -->
      <div cardHeader class="header-content">
        <img
          ngSrc="assets/img/teacher.png"
          width="200"
          height="200"
          alt="Teacher"
          class="header-image" />
      </div>

      <!-- Item Template -->
      <ng-template #itemTemplate let-teacher>
        <app-list-item
          [name]="teacher.firstName"
          [id]="teacher.id"
          [type]="cardType"
          (delete)="deleteTeacher(teacher.id)"></app-list-item>
      </ng-template>

      <!-- Footer Template -->
      <div cardFooter>
        <button class="add-button" (click)="addTeacher()">Add Teacher</button>
      </div>
    </app-card>
  `,
  styles: [
    `
      .teacher-card {
        @apply bg-gradient-to-br from-red-50 to-white;
      }
      .header-content {
        @apply flex justify-center;
      }
      .header-image {
        @apply rounded-lg object-cover shadow-sm;
      }
      .add-button {
        @apply w-full rounded-md bg-blue-500 px-4 py-2 text-white;
        @apply transition-colors duration-200 hover:bg-blue-600;
        @apply disabled:cursor-not-allowed disabled:opacity-50;
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, NgOptimizedImage],
  standalone: true,
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
