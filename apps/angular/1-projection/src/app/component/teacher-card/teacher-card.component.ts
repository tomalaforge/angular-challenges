import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      [type]="cardType"
      [headerTemplate]="teacherHeaderTemplate"
      class="bg-light-red"></app-card>

    <ng-template #teacherHeaderTemplate let-list="list">
      <div class="teacher-header">
        <img src="assets/img/teacher.png" alt="Teacher Image" width="200px" />
      </div>
    </ng-template>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
        display: block;
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  @ViewChild('teacherHeaderTemplate') teacherHeaderTemplate!: TemplateRef<any>;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }
}
