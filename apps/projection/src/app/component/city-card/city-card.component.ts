import { Component, inject, OnInit } from '@angular/core';
import { DestroyService } from '../../service/destroy.service';
import { CardRowDirective } from '../../directive/card-row/card-row.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardComponent } from '../../ui/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { City } from '../../model/city.model';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-city-card',
  template: ` <app-card [list]="cities()" (addItem)="onAddItem()">
    <img card-img src="/assets/img/city.jpeg" alt="" />
    <ng-template [appCardRow]="cities()" let-city>
      <app-list-item (delete)="onDeleteItem(city.id)">
        <div>{{ city.country }}</div>
        <div>{{ city.name }}</div>
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  providers: [DestroyService],
  imports: [
    CardComponent,
    ListItemComponent,
    CardRowDirective,
    CardRowDirective,
    ListItemComponent,
    CardComponent,
  ],
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  private destroy$ = inject(DestroyService);

  cities = toSignal<City[], City[]>(this.store.cities$, {
    initialValue: [] as City[],
  });

  ngOnInit(): void {
    this.http.fetchCities$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cities) => this.store.addAll(cities));
  }

  onAddItem(): void {
    this.store.addOne(randomCity());
  }

  onDeleteItem(id: number): void {
    this.store.deleteOne(id);
  }
}
