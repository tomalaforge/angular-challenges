import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardModel } from '../../model/card.model';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="studentCards()"
      (addNewItem)="addStudent()"
      class="bg-light-green">
      <img src="assets/img/student.webp" width="200px" alt="student" />
      <ng-template [cardRow]="studentCards()" let-city>
        <app-list-item
          [id]="city.id"
          (deleteItem)="this.deleteStudent(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgClass, CardRowDirective, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  studentCards = computed(() =>
    this.store
      .students()
      .map((value) => ({ id: value.id, name: value.firstName }) as CardModel),
  );

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
