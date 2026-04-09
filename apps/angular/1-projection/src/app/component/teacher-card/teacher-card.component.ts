import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent, CardItemDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  template: `
    <app-card
      [list]="teachers()"
      (added)="addNewItem()"
      customClass="bg-light-red">
      <img
        card-image
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="teacher"
        priority />
      <ng-template cardItem let-teacher>
        <app-list-item (deleted)="deleteItem(teacher.id)">
          {{ teacher.firstName }}
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
  encapsulation: ViewEncapsulation.None,
  imports: [
    CardComponent,
    CardItemDirective,
    NgOptimizedImage,
    ListItemComponent,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

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
