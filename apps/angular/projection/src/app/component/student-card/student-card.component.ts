import { Component, inject } from '@angular/core';
import { randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { ListItemTemplateDirective } from '../../list-item-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="store.objects()" (add)="add()" class="bg-light-green">
      <img img src="assets/img/student.webp" width="200px" />
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
export class StudentCardComponent {
  protected store = inject(StudentStore);

  constructor() {}

  add(): void {
    this.store.addOne(randStudent());
  }

  remove(id: number): void {
    this.store.deleteOne(id);
  }
}
