import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import {
  CardComponent,
  CardImageDirective,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  templateUrl: 'teacher-card.component.html',
  styles: [
    `
      :host {
        background-color: rgba(250, 0, 0, 0.1);
        width: max-content;
        height: max-content;
      }
    `,
  ],
  standalone: true,
  imports: [
    CardComponent,
    CardImageDirective,
    CardListItemDirective,
    ListItemComponent,
    AsyncPipe,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  public teachers$ = toSignal(this.store.teachers$); // : Signal<Teacher[] | undefined>

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
