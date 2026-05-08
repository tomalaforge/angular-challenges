import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="store.teachers()"
      customClass="bg-red-100"
      (add)="store.addOne(randTeacher())">
      <img
        card-image
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="" />
      <ng-template appCardItem let-teacher>
        <app-list-item
          [id]="$any(teacher).id"
          [name]="$any(teacher).firstName"
          (delete)="store.deleteOne($event)" />
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    CardItemDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  protected store = inject(TeacherStore);

  randTeacher = randTeacher;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
}
