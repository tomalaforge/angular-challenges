import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardListItem } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="studentListItems"
      class="bg-light-green"
      (addNewItemEvent)="handleAddNewItemEvent()"
      (deleteItemEvent)="handleDeleteItemEvent($event)">
      <div card-img>
        <img src="assets/img/student.webp" width="200px" />
      </div>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  studentListItems: CardListItem[] = [];

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((students) => {
      this.studentListItems = students.map((student) => {
        return {
          name: student.firstName,
          id: student.id,
        };
      });
    });
  }

  handleAddNewItemEvent() {
    this.store.addOne(randStudent());
  }

  handleDeleteItemEvent(id: number) {
    this.store.deleteOne(id);
  }
}
