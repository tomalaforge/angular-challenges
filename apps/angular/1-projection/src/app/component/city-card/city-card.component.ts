import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardItemDirective } from '../../card-item';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  template: `
    <app-card
      (addClicked)="store.addOne(randCity())"
      [list]="cities()"
      customClass="bg-blue-100">
      <img
        ngSrc="../../../assets/img/city.png"
        width="200"
        height="200"
        alt="City Icon" />

      <ng-template appCardItem let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.name"
          (deleteClicked)="store.deleteOne(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    ListItemComponent,
    NgOptimizedImage,
    CardItemDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  protected store = inject(CityStore);
  private http = inject(FakeHttpService);

  cities = this.store.cities;
  protected readonly randCity = randomCity;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }
}
