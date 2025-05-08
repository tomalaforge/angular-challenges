import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CityStore } from './../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-green"
      (Add)="addNewCity()">
      <ng-template #rowTemplate let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }} || {{ city.country }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, ListItemComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;
  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => {
      console.log(s);

      this.store.addAll(s);
    });
  }
  addNewCity() {
    this.store.addOne(randomCity());
  }
  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
