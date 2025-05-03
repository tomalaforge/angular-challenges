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
      customClass="bg-color"
      [imgTitle]="cardImg"
      [list]="students()"
      (addNew)="addNewItem()"
      (itemId)="deleteItem($event)" />
  `,
  styles: [
    `
      :host {
        --card-background: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(StudentStore);

  students = computed(() => {
    return this.store.students().map((item) => {
      return { ...item, name: item.firstName };
    });
  });
  cardImg = 'assets/img/student.webp';

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
