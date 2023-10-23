import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService, randomCity } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities"
            (delete)="delete($event)"
            customClass="bg-light-blue">
    <img alt="student"
         cardImage
         src="assets/img/city.jpg"
         width="200px" />
    <button addNewItemBtn
            class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
            (click)="addNewItem()">
           Add
    </button>
  </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  private store = inject(CityStore);
  private http = inject(FakeHttpService);
  cities: City[] = [];

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

}
