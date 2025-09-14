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
import { SectionCardDirective } from '../../directive/sectionCard.directive';
import { Actions } from '../../model/actions.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      customClass="bg-light-green"
      [itemTemplate]="itemTemplate">
      <img
        sectionCard="header"
        ngSrc="assets/img/student.webp"
        width="200"
        height="200" />

      <ng-template #itemTemplate let-student>
        <app-list-item
          [name]="student.firstName"
          [id]="student.id"
          (deleteEvent)="onDeleteItem($event)"></app-list-item>
      </ng-template>

      <button
        sectionCard="footer"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddNewItem()">
        Add
      </button>
    </app-card>
  `,
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    SectionCardDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit, Actions {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  onAddNewItem() {
    this.store.addOne(randStudent());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
