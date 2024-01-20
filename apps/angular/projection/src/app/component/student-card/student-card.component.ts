import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import {
  CardComponent,
  CardImageDirective,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',

  templateUrl: 'student-card.component.html',

  standalone: true,
  styles: [
    `
      :host {
        background-color: rgba(0, 250, 0, 0.1);
        width: max-content;
        height: max-content;
      }
    `,
  ],
  imports: [
    CardComponent,
    CardImageDirective,
    CardListItemDirective,
    ListItemComponent,
    AsyncPipe,
  ],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  public students$ = this.store.students$;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
