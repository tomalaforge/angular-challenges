import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import {
  CardComponent,
  CardContentDirective,
  CardImageDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  templateUrl: 'student-card.component.html',
  styles:
    ':host { display: block; } .bg-light-green { background-color: rgba(0, 250, 0, 0.1); }',
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    CardImageDirective,
    CardContentDirective,
    ListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  students$!: Observable<Student[]>;

  constructor(
    private destroyRef: DestroyRef,
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((s) => this.store.addAll(s));

    this.students$ = this.store.students$.pipe(
      takeUntilDestroyed(this.destroyRef),
    );
  }

  add() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
