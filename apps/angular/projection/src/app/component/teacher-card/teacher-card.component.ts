import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { NgTemplateListItemDirective } from '../../ui/list-item/ng-template-list-item.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      [itemTemplate]="itemTemplate"
      backgroundClass="bg-red-200"
      customClass="bg-light-red"
      (clickedAdd)="addTeacher()">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" priority />
    </app-card>

    <ng-template listItem [infer]="teachers" #itemTemplate let-teacher>
      <app-list-item
        [name]="teacher.firstName"
        [id]="teacher.id"
        (clickedRemove)="removeTeacher($event)" />
    </ng-template>
  `,
  standalone: true,
  imports: [
    NgOptimizedImage,
    CardComponent,
    ListItemComponent,
    NgTemplateListItemDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  #http = inject(FakeHttpService);
  #store = inject(TeacherStore);

  teachers: Teacher[] = [];

  ngOnInit(): void {
    this.#http.fetchTeachers$.subscribe((teachers) =>
      this.#store.addAll(teachers),
    );

    this.#store.teachers$.subscribe((teachers) => (this.teachers = teachers));
  }

  protected addTeacher() {
    this.#store.addOne(randTeacher());
  }

  protected removeTeacher(teacherId: number) {
    this.#store.deleteOne(teacherId);
  }
}
