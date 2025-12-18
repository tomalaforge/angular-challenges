import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardActionsDirective } from '../../ui/card/card-actions.directive';
import { CardImageDirective } from '../../ui/card/card-image.directive';
import { CardListItemDirective } from '../../ui/card/card-list-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CardComponent,
    ListItemComponent,
    CardImageDirective,
    CardListItemDirective,
    CardActionsDirective,
  ],
  template: `
    <app-card [list]="cities()" class="bg-light-blue">
      <ng-template cardImage>
        <img ngSrc="assets/img/city.png" width="200" height="200" alt="City" />
      </ng-template>

      <ng-template cardListItem let-city>
        <app-list-item (onDelete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>

      <ng-template cardActions>
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2 hover:bg-blue-400"
          (click)="addCity()">
          Add City
        </button>
      </ng-template>
    </app-card>
  `,
  styles: `
    .bg-light-blue {
      background-color: rgba(0, 0, 250, 0.1);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
