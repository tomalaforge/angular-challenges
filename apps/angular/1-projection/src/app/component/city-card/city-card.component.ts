import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  templateUrl: './city-card.component.html',
  standalone: true,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .bg-light-blue {
      background: #0099ff;
    }
  `,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  constructor() {
    this.http.fetchCities$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => this.store.addAll(data));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    console.log(id);
    this.store.deleteOne(id);
  }
}
