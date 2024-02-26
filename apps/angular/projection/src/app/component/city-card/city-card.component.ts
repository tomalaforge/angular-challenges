import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { CityStore } from '../../data-access/city.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { ListItemDirective } from '../../ui/list-item-directive/list-item.directive';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities()"
    [type]="cardType"
    customClass="bg-lightyellow">
    <ng-template listItem let-rowItem>
      <app-list-item [id]="rowItem.id" [type]="cardType">{{
        rowItem.name
      }}</app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemDirective],
  styles: [
    `
      .bg-lightyellow {
        background-color: lightyellow;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CityCardComponent implements OnInit {
  constructor(private store: CityStore, private http$: FakeHttpService) {}
  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http$.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }
}
