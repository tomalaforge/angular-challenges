import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  WritableSignal,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { Teacher } from './../../model/teacher.model';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [template]="listItem"
      (addNewItem)="addNewItem()"
      customClass="bg-light-red">
      <img
        card-header
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="" />
    </app-card>

    <ng-template #listItem let-item>
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        (deleteItem)="deleteItem($event)" />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http: FakeHttpService = inject(FakeHttpService);
  private store: TeacherStore = inject(TeacherStore);

  protected teachers: WritableSignal<Teacher[]> = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  public addNewItem(): void {
    this.store.addOne(randTeacher());
  }

  public deleteItem(id: number): void {
    this.store.deleteOne(id);
  }
}
