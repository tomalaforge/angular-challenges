import { NgOptimizedImage } from '@angular/common';
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
import { OptionTemplateDirective } from '../../directive/option-template.directive';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" [customClass]="'bg-light-green'">
      <img
        ngProjectAs="card-image"
        ngSrc="assets/img/student.webp"
        width="200"
        height="200" />
      <ng-template appOptionTemplate let-student>
        <app-list-item>
          <ng-container ngProjectAs="item-name">
            {{ student.firstName }}
          </ng-container>
          <button ngProjectAs="item-action" (click)="delete(student.id)">
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      </ng-template>
      <button
        ngProjectAs="card-action"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    OptionTemplateDirective,
  ],
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

  delete(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }
}
