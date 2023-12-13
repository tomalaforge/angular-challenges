import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
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
  templateUrl: './teacher-card.component.html',
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit, OnDestroy {
  protected teachers$ = this.store.teachers$;

  private _subscriptions = new Subscription();

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.http.fetchTeachers$.subscribe((t: Teacher[]): void =>
        this.store.addAll(t),
      ),
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  protected addTeacher() {
    this.store.addOne(randTeacher());
  }

  protected deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
