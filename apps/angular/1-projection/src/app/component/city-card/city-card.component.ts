import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" [type]="cardType" [template]="images">
      <ng-template #images>
        <img ngSrc="assets/img/student.webp" width="200" height="200" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CommonModule, CardComponent],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit() {
    this.http.fetchCities$.subscribe((c) => {
      this.store.addAll(c);
    });
  }
}
