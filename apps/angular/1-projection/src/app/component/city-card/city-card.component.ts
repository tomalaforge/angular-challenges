import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { UnSubscribeOnDestroy } from '../abstract/unsubscribe.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [items]="cities()"
      customClass="bg-light-blue"
      (additems)="addCity()">
      <img src="assets/img/city.png" width="200px" />

      <ng-template #listTemplate let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent extends UnSubscribeOnDestroy implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly cityStore = inject(CityStore);

  cities = this.cityStore.cities;

  ngOnInit(): void {
    this.http.fetchCities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((city) => this.cityStore.addAll(city));
  }

  public addCity(): void {
    this.cityStore.addOne(randomCity());
  }

  public deleteCity(id: number): void {
    this.cityStore.deleteOne(id);
  }
}
