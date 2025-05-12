import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      (addNewItem)="addNewItem()"
      (deleteItem)="deleteItem($event)"
      [list]="students()"
      [type]="cardType"
      [customClass]="'green'">
      <img
        #cardImage
        ngSrc="assets/img/student.webp"
        width="200"
        height="200" />
      <ng-template #listTemplate let-item>
        <app-list-item>
          <!-- <span>{{ student.firstName }}</span> -->
          <button #deleteButton (click)="deleteItem(item.id)">
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .green {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StudentCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  public readonly store = inject(StudentStore);

  students = this.store.students;
  cardType = CardType.STUDENT;
  deleteFromStore = output<Event>();

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
