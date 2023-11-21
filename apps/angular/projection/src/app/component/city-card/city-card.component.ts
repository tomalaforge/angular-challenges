import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  standalone: true,
  selector: 'app-city-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  template: `
    <app-card class="bg-light-blue" [list]="cities$()" (add)="add()">
      <img src="assets/img/city.png" width="200px" />
      <ng-template appCardRow let-city>
        <app-list-item (delete)="delete(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
})
export class CityCardComponent implements OnInit {
  readonly cities$ = this.cityStore.data$;

  constructor(private http: FakeHttpService, private cityStore: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.cityStore.addAll(s));
  }

  add(): void {
    this.cityStore.addOne(randomCity());
  }
  delete(id: number): void {
    this.cityStore.deleteOne(id);
  }
}
