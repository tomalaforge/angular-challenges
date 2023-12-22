import { Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service';
import { ListItemTemplateDirective } from '../../list-item-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="store.objects()" (add)="add()" class="bg-light-blue">
      <img img src="assets/img/city.png" width="200px" />
      <ng-template let-item list-item-template>
        <app-list-item
          [name]="item.name"
          (remove)="remove(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemTemplateDirective],
})
export class CityCardComponent {
  protected store = inject(CityStore);

  add(): void {
    this.store.addOne(randomCity());
  }

  remove(id: number): void {
    this.store.deleteOne(id);
  }
}
