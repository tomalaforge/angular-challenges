import { Component, OnInit } from '@angular/core';
import { FakeHttpService, randomCity, randTeacher } from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      (addItem)="onAddItem()"
      customClass="bg-light-orange">
      <img src="assets/img/city.png" width="200px"/>

      <ng-template #listItem let-item>
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          (deleteItem)="onDeleteItem(item.id)"
        >
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-orange {
        background-color: orange;
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.cities$.subscribe((t) => (this.cities = t));
  }
  onAddItem(){
    this.store.addOne(randomCity());
  }

  onDeleteItem(id: number){
    this.store.deleteOne(id);
  }
}
