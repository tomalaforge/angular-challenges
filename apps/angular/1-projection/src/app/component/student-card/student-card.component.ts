import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [image]="'assets/img/student.webp'"
      [list]="vm()"
      customClass="student-card"
      (add)="add()"
      (delete)="delete($event)"></app-card>
  `,
  styles: [
    `
      .student-card {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  vm = computed(() =>
    this.store.students().map((s /*: Student */) => ({
      id: s.id,
      label: s.firstName,
    })),
  );

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  add() {
    this.store.addOne(randStudent());
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
