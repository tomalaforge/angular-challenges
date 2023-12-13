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
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit, OnDestroy {
  protected students$ = this.store.students$;

  private _subscriptions = new Subscription();

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.http.fetchStudents$.subscribe((s: Student[]): void =>
        this.store.addAll(s),
      ),
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  protected addStudent() {
    this.store.addOne(randStudent());
  }

  protected deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
