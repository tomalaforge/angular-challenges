import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { ICardComponent } from '../../model/card-component';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: ` <ng-template let-item>{{ item.firstname }}</ng-template>
    <app-card
      [list]="teachers"
      [cardTemplateRef]="cardTemplate"
      (addItem)="addNewItem()"
      (deleteItem)="deleteItem($event)"
      customClass="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" cardContent />
    </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit, ICardComponent {
  @ViewChild(TemplateRef) cardTemplate!: TemplateRef<{ item: Teacher }>;
  teachers: Teacher[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
