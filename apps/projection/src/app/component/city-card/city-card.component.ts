import { Component, inject, OnInit } from '@angular/core';
import {
  CardComponent,
  CardContentComponent,
  CardContentDirective,
} from '../../ui/card';
import { City } from '../../model';
import { AsyncPipe, NgForOf } from '@angular/common';
import { CityService, CityStore } from '../../data-access';
import { ListComponent, ListItemComponent } from '../../ui/list';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  standalone: true,
  styles: [
    `
      img {
        width: 200px;
        height: 200px;
      }
    `,
  ],
  imports: [
    CardComponent,
    CardContentComponent,
    CardContentDirective,
    ListComponent,
    ListItemComponent,
    AsyncPipe,
    NgForOf,
  ],
})
export class CityCardComponent implements OnInit {
  private readonly cityService = inject(CityService);
  private readonly cityStore = inject(CityStore);

  readonly cities$ = this.cityStore.cities$;
  readonly lightYellow = 'rgba(250, 250, 0, 0.1)';

  ngOnInit() {
    this.cityService.loadData().subscribe();
  }

  add() {
    this.cityService.addCity();
  }

  delete(id: number) {
    this.cityService.deleteCity(id);
  }

  trackBy(index: number, item: City): number {
    return item.id;
  }
}
