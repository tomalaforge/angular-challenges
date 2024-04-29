import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardBgColorDirective } from '../../directive/card-background-color.directive';
import { CardImageTemplateDirective } from '../../directive/card-image-template.directive';
import { ListItemTemplateDirective } from '../../directive/list-item-template-directive';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  templateUrl: './city-card.component.html',
  imports: [
    CardComponent,
    CardImageTemplateDirective,
    ListItemComponent,
    ListItemTemplateDirective,
    CardBgColorDirective,
  ],
})
export class CityCardComponent implements OnInit, OnDestroy {
  private store = inject(CityStore);
  private http = inject(FakeHttpService);
  private destroy$ = new Subject<void>();

  cities: City[] = [];

  ngOnInit() {
    this.http.fetchCities$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (cities) => {
        this.store.addAll(cities);
      },
    });

    this.store.cities$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (cities) => {
        this.cities = cities;
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCityName({ name, country }: City): string {
    return `${name}, ${country}`;
  }

  onAddCityItem() {
    this.store.addOne(randomCity());
  }

  onDeleteCityItem(id: number) {
    this.store.deleteOne(id);
  }
}
