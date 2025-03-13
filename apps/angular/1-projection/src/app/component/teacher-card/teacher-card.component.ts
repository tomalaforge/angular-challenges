import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card class="bg" [list]="store.teachers()" (addedNewItem)="addItem()">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />

      <ng-template [app-card-list-item]="store.teachers()" let-item>
        <app-list-item (deleted)="store.deleteOne(item.id)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [
    NgOptimizedImage,
    CardComponent,
    CardListItemDirective,
    ListItemComponent,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  protected store = inject(TeacherStore);

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addItem(): void {
    this.store.addOne(randTeacher());
  }
}
