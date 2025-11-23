import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [image]="'assets/img/teacher.png'"
      [list]="vm()"
      customClass="teacher-card"
      (add)="add()"
      (delete)="delete($event)" />
  `,
  styles: [
    `
      .teacher-card {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  vm = computed(() =>
    this.store.teachers().map((t /*: Student */) => ({
      id: t.id,
      label: t.firstName,
    })),
  );

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  add() {
    this.store.addOne(randTeacher()); // или store.addOne(randTeacher())
  }

  delete(id: number | Event) {
    let idNumber: number | undefined;

    if (typeof id === 'number') {
      idNumber = id;
    } else {
      // If the emitter sends a CustomEvent with detail
      const maybeCustom = id as CustomEvent;
      if (maybeCustom?.detail !== undefined) {
        idNumber = Number(maybeCustom.detail);
      } else {
        // Fallback: try to read a value from the event target (e.g. input/button)
        const target = (id as Event).target as HTMLInputElement | null;
        if (target && target.value !== undefined) {
          idNumber = Number(target.value);
        }
      }
    }

    if (typeof idNumber === 'number' && !Number.isNaN(idNumber)) {
      this.store.deleteOne(idNumber);
    }
  }
}
