import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styles: [
    `
      .bg-light-blue {
        background-color: #9de1dd;
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class CityCardComponent implements OnInit {
  cities$!: Observable<City[]>;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.cities$ = this.store.cities$;
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
