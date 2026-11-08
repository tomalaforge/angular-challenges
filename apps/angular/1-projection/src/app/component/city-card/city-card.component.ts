import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FakeHttpService, randomCity } from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-blue"
      [content]="store">
      <img ngProjectAs="image-url" src="assets/img/city.png" width="200" height="200" alt="" />
      <button 
        ngProjectAs="add-button"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add City
      </button>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  readonly store = inject(CityStore);
 
  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }
  addNewItem() {
    this.store.addOne(randomCity());
  }

}
