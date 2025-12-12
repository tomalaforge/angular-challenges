import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardActionsDirective } from '../../ui/card/card-actions.directive';
import { CardImageDirective } from '../../ui/card/card-image.directive';
import { CardListItemDirective } from '../../ui/card/card-list-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" customClass="bg-light-red">
      <ng-template cardImage>
        <img
          ngSrc="assets/img/teacher.png"
          width="200"
          height="200"
          alt="Teacher" />
      </ng-template>

      <ng-template cardListItem let-teacher>
        <app-list-item (onDelete)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>

      <ng-template cardActions>
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addTeacher()">
          Add Teacher
        </button>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [
    NgOptimizedImage,
    CardComponent,
    ListItemComponent,
    CardImageDirective,
    CardListItemDirective,
    CardActionsDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(TeacherStore);

  teachers = this.store.teachers;

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
