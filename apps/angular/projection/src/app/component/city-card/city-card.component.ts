import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (add)="addCity()">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template cardRow let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(CityStore);

  public cities = this.store.cities;

  private getInitialData$ = this.http.fetchCities$.pipe(takeUntilDestroyed());

  public ngOnInit(): void {
    this.getInitialData$.subscribe((t) => this.store.addAll(t));
  }

  public addCity(): void {
    this.store.addOne(randomCity());
  }

  public deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
