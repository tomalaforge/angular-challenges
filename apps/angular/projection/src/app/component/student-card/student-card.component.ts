import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FakeHttpService, randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students$ | async"
      [customClass]="'bg-light-green'"
      [listTemplateRef]="listTemplateRef"
      (delete)="delete($event)">
   
      <img cardImage
        src="assets/img/student.webp"
        width="200px" /> 

        <button cardActionButton
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewStudent()">
        Add
      </button>
    </app-card>

    <ng-template #listTemplateRef let-item>
        <p>{{item.firstName}}</p>
    </ng-template>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None
})
export class StudentCardComponent implements OnInit {
  students$: Observable<Student[]> = this.store.students$;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) { }

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewStudent() {
    this.store.addOne(randStudent());
  }
  delete(id: number) {
    this.store.deleteOne(id);
  }
}
