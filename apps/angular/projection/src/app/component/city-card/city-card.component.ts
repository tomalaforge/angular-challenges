import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { ListItem } from '../../model/listItem.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="listToSend"
      [type]="cardType"
      [color]="'rgba(0,0,255,0.1)'"></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;
  listToSend!: ListItem[];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.city$.subscribe((c) => {
      this.cities = c;
      this.listToSend = this.cities.map((c) => {
        return {
          id: c.id,
          name: c.name,
          type: CardType.CITY,
        };
      });
    });
  }
}
