import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      [imgUrl]="'assets/img/teacher.png'"
      (newItem)="onNewItem()">
      <ng-template #rowTemplate let-teacher>
        <app-list-item
          [name]="teacher.firstname + ' ' + teacher.lastname"
          [id]="teacher.id"
          (itemDelete)="onItemDelete($event)" />
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
  standalone: true,
  imports: [CardComponent, ListItemComponent],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  onItemDelete(id: number) {
    this.store.deleteOne(id);
  }

  onNewItem() {
    this.store.addOne(randTeacher());
  }
}
