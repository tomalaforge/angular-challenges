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
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="store.students()"
      customClass="bg-green-100"
      (add)="store.addOne(randStudent())">
      <img
        card-image
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt="" />
      <ng-template appCardItem let-student>
        <app-list-item
          [id]="$any(student).id"
          [name]="$any(student).firstName"
          (delete)="store.deleteOne($event)" />
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    CardItemDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  protected store = inject(StudentStore);

  randStudent = randStudent;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
}
