import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { StoreUtilsService } from '../../data-access/store-utils.service';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemDirective } from '../../ui/list-item/list-item.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (addNewItem)="addNewTeacher()">
      <img
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        priority="" />

      <ng-template appListItem let-item>
        <app-list-item
          [name]="item.firstName + ' ' + item.lastName"
          [id]="item.id"
          [type]="item.type"
          (deleteItem)="deleteTeacher(item.id)" />
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      :host {
        --card-bg-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemDirective,
    ListItemComponent,
  ],
  providers: [StoreUtilsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  #http = inject(FakeHttpService);
  #storeUtil = inject<StoreUtilsService<Teacher>>(StoreUtilsService<Teacher>);

  teachers = this.#storeUtil.getState();
  type = CardType.TEACHER;

  ngOnInit(): void {
    this.#http.fetchTeachers$.subscribe((t) => this.#storeUtil.addAll(t));
  }

  addNewTeacher(): void {
    this.#storeUtil.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.#storeUtil.deleteOne(id, (teacher) => teacher.id);
  }
}
