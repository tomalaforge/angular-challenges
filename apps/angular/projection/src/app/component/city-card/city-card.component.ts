import { Component, OnInit, signal } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-city-card',
  template:
    '<app-card (add)="addOne()" [list]="cities()" class="bg-blue-200"><ng-template #rowRef let-city><app-list-item (delete)="deleteOne(city.id)">{{ city.name }}</app-list-item></ng-template></app-card>',
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities = signal<City[]>([])

  constructor(
    private http: FakeHttpService,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => {
      this.cities.update(() => s)
    });
  }

  addOne() {
    this.cities.update(value => [...value, randomCity()])
  }

  deleteOne(id: number) {
    this.cities.update(value => value.filter((s) => s.id !== id))
  }
}
