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
import { CardImgDirective } from '../../ui/card-img-directive/card-img.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { TemplateDirective } from '../../ui/template-directive/template.directive';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" [addItemFn]="addItemFn">
      <img
        appCardImg
        ngSrc="assets/img/student.webp"
        width="200"
        height="200" />
      <ng-template appTemplate let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          [deleteItemFn]="deleteItemFn"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      :host {
        --card-background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    CardImgDirective,
    TemplateDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  readonly deleteItemFn = (id: number) => this.store.deleteOne(id);
  readonly addItemFn = () => this.store.addOne(randStudent());
}
