import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CardItemDirective } from '../../card-item';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  standalone: true,
  template: `
    <app-card
      (addClicked)="store.addOne(randStudent())"
      [list]="students()"
      customClass="bg-green-100">
      <img
        ngSrc="../../../assets/img/student.webp"
        width="200"
        height="200"
        alt="Student Icon" />

      <ng-template appCardItem let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.firstName"
          (deleteClicked)="store.deleteOne(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [],
  imports: [
    CardComponent,
    ListItemComponent,
    NgOptimizedImage,
    CardItemDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  protected store = inject(StudentStore);

  students = this.store.students;
  protected readonly randStudent = randStudent;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
}
