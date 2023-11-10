import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { CardImageDirective } from '../../ui/card/card-image.directive';
import { NgIf } from '@angular/common';
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers"
    (add)="addNewItem()"
    class="bg-light-red">
    <ng-template appCardImage>
      <img src="assets/img/teacher.png" width="200px" />
    </ng-template>
    <ng-template appCardItem let-item>
      <app-list-item (delete)="delete(item.id)">
        {{ item.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [
    CardComponent,
    CardImageDirective,
    NgIf,
    CardItemDirective,
    ListItemComponent,
  ],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
