import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent, CardListDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card [list]="cities" class="bg-light-green">
    <ng-template card-list let-item>
      <app-list-item (deleteEvent)="deleteCity(item.id)">
        {{ item.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,

  standalone: true,
  imports: [CardComponent, CardListDirective, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(private http: FakeHttpService) {}
  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => {
      this.cities = t;
    });
  }

  deleteCity(id: number) {
    this.cities = this.cities.filter((c) => c.id !== id);
  }
}
