import { Component, OnInit, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardHeaderTemplateDirective } from '../../directive/card-header-template.directive';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  templateUrl: 'city-card.component.html',
  standalone: true,
  imports: [CardComponent, CardHeaderTemplateDirective],
})
export class CityCardComponent implements OnInit {
  store = inject(CityStore);
  http = inject(FakeHttpService);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
