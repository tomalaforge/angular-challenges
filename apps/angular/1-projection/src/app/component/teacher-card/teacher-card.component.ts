import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardImgDirective } from '../../ui/card-img-directive/card-img.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { TemplateDirective } from '../../ui/template-directive/template.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" [addItemFn]="addItemFn">
      <img
        appCardImg
        ngSrc="assets/img/teacher.png"
        priority
        width="200"
        height="200" />
      <ng-template appTemplate let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          [deleteItemFn]="deleteItemFn"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      :host {
        --card-background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    CardImgDirective,
    TemplateDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  readonly deleteItemFn = (id: number) => this.store.deleteOne(id);
  readonly addItemFn = () => this.store.addOne(randTeacher());
}
