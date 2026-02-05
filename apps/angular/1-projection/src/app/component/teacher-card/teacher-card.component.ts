import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardItemDirective } from '../../card-item';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  template: `
    <app-card
      (addClicked)="store.addOne(randTeacher())"
      [list]="teachers()"
      customClass="bg-red-100">
      <img
        ngSrc="../../../assets/img/teacher.png"
        width="200"
        height="200"
        priority
        alt="Teacher Icon" />

      <ng-template appCardItem let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.firstName"
          (deleteClicked)="store.deleteOne(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [],
  imports: [
    CardComponent,
    ListItemComponent,
    NgOptimizedImage,
    CardItemDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  protected store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  protected readonly randTeacher = randTeacher;
}
