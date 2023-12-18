import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { ItemStore, provideItemStore } from '../../data-access/item.store';
import { City } from '../../model/city.model';
import {
  CardComponent,
  CardContentDirective,
  CardImageDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  templateUrl: 'city-card.component.html',
  styles:
    ':host { display: block; } .bg-light-blue { background-color: rgba(0, 0, 255, 0.1); }',
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    CardImageDirective,
    CardContentDirective,
    ListItemComponent,
  ],
  providers: [provideItemStore<City>('city-store')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  http = inject(FakeHttpService);
  store = inject(ItemStore<City>);

  ngOnInit(): void {
    this.http.fetchCities$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((c) => this.store.addAll(c));
  }

  add() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
