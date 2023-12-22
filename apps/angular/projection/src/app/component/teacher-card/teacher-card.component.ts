import { Component, inject } from '@angular/core';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { ListItemTemplateDirective } from '../../list-item-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="store.objects()" (add)="add()" class="bg-light-red">
      <img img src="assets/img/teacher.png" width="200px" />
      <ng-template let-item list-item-template>
        <app-list-item
          [name]="item.firstName"
          (remove)="remove(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemTemplateDirective],
})
export class TeacherCardComponent {
  protected store = inject(TeacherStore);

  constructor() {}

  add(): void {
    this.store.addOne(randTeacher());
  }

  remove(id: number): void {
    this.store.deleteOne(id);
  }
}
