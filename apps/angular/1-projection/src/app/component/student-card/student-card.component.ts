import { Component, OnInit, computed, inject } from '@angular/core';
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
      [list]="studentListItems()"
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
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  studentListItems = computed<CardListItem[]>(() =>
    this.store.students().map((student) => ({
      name: student.firstName,
      id: student.id,
    })),
  );

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  handleAddNewItemEvent() {
    this.store.addOne(randStudent());
  }

  handleDeleteItemEvent(id: number) {
    this.store.deleteOne(id);
  }
}
