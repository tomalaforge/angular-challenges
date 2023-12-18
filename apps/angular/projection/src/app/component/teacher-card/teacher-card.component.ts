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
  randTeacher,
} from '../../data-access/fake-http.service';
import { ItemStore, provideItemStore } from '../../data-access/item.store';
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
  providers: [provideItemStore<Teacher>('teacher-store')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  http = inject(FakeHttpService);
  store = inject(ItemStore<Teacher>);

  ngOnInit(): void {
    this.http.fetchTeachers$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((t) => this.store.addAll(t));
  }

  add() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
