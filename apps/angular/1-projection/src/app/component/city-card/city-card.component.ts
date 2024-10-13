import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [type]="cardType"
      [headerTemplate]="cityHeaderTemplate"
      class="bg-light-blue"></app-card>

    <ng-template #cityHeaderTemplate let-list="list">
      <div class="city-header">
        <img src="assets/img/city.png" alt="City Image" width="200px" />
      </div>
    </ng-template>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 255, 0.1);
        display: block;
      }
    `,
  ],
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;
  @ViewChild('cityHeaderTemplate') cityHeaderTemplate!: TemplateRef<any>;

  constructor(
    private http: FakeHttpService,
    private cityStore: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.cityStore.addAll(s));
    this.cityStore.cities$.subscribe((s) => (this.cities = s));
  }
}
