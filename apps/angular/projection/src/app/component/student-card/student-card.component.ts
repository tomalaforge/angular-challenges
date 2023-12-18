import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { ItemStore, provideItemStore } from '../../data-access/item.store';
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
  providers: [provideItemStore<Student>('student-store')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  http = inject(FakeHttpService);
  store = inject(ItemStore<Student>);

  ngOnInit(): void {
    this.http.fetchStudents$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((s) => this.store.addAll(s));
  }

  add() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
