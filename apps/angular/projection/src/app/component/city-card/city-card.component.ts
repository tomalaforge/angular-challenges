import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (addNewItemEvent)="addCity()">
      <img src="assets/img/city.png" width="200px" />
      <ng-template [cardRows]="cities()" let-city>
        <app-list-item (deleteEvent)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  public cities = toSignal(this.store.cities$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => {
      this.store.addAll(c);
    });
  }

  addCity() {
    this.store.addOne(randomCity());
  }
  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
