import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent, CardListDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card [list]="teachers" [type]="cardType" [isTeacher]="true">
    <ng-template card-list let-item="item">
      <app-list-item
        [id]="item.id"
        [type]="item.type"
        [name]="item.firstname"
        (deleteEvent)="deleteTeacher($event)"></app-list-item>
    </ng-template>
  </app-card>`,

  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListDirective],
  encapsulation: ViewEncapsulation.None,
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => {
      this.teachers = t;
    });
  }

  deleteTeacher(id: number) {
    console.log(id);
    this.store.deleteOne(id);
  }
}
