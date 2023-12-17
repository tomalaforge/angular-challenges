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
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import {
  CardComponent,
  CardContentDirective,
  CardImageDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  templateUrl: 'teacher-card.component.html',
  styles: [
    ':host { display: block; } .bg-light-red { background-color: rgba(250, 0, 0, 0.1); }',
  ],
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
export class TeacherCardComponent implements OnInit {
  teachers$!: Observable<Teacher[]>;

  constructor(
    private destroyRef: DestroyRef,
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((t) => this.store.addAll(t));

    this.teachers$ = this.store.teachers$.pipe(
      takeUntilDestroyed(this.destroyRef),
    );
  }

  add() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
