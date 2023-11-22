import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { CardDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: ` <app-card
    [list]="this.store.cities()"
    (add)="addNewCity()"
    class="bg-light-blue">
    <img src="assets/img/city.png" width="200px" />
    <ng-template template-row let-city>
      <app-list-item (delete)="deleteCity(city.id)">
        {{ city.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, CardDirective, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  private readonly http: FakeHttpService = inject(FakeHttpService);
  public readonly store: CityStore = inject(CityStore);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
