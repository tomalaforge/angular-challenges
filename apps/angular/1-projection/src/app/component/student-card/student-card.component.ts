import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [itemTemplateRef]="listItemTemplate"
      (itemAdded)="addItem()"
      customClass="bg-light-green">
      <!--      <h1 ngProjectAs="card-image">Come on</h1>-->
      <img src="assets/img/student.webp" card-image width="200" height="200" />
    </app-card>
    <ng-template #listItemTemplate let-item>
      {{ item.firstName }}
      <button (click)="onItemDeleted(item)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </ng-template>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
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

  students = this.store.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
  onItemDeleted(item: any) {
    this.store.deleteOne(item.id);
  }
  addItem() {
    this.store.addOne(randStudent());
  }
}
