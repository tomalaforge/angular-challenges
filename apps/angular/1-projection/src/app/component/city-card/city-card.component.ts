import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import {
  CardAction,
  CardActionType,
  CardComponent,
} from '../../ui/card/card.component';
import { CardListItemTemplateDirective } from '../../ui/list-item/list-item-template.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-green"
      (actions)="cardActions($event)">
      <img ngSrc="assets/img/city.png" width="200" height="200" alt="" />

      <ng-template cardListItem let-item let-onDeleteAction="onDeleteAction">
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          (deleteEvent)="onDeleteAction(item.id)" />
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    CardListItemTemplateDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  cardActions(action: CardAction) {
    switch (action.type) {
      case CardActionType.ADD:
        this.store.addOne(randomCity());
        break;
      case CardActionType.DELETE:
        this.store.deleteOne(action.payload.id);
        break;
      default:
        console.log('Unknown');
    }
  }
}
