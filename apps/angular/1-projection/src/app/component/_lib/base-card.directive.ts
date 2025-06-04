import { Directive, inject, OnInit, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataAccessStore } from '../../data-access/_lib/base-service-data-access-store';
import { FakeHttpService } from '../../data-access/fake-http.service';

@Directive()
export abstract class BaseCardComponent<T> implements OnInit {
  private _store = inject(BaseDataAccessStore);
  protected http = inject(FakeHttpService);

  abstract randMethod: () => T;
  items: Signal<T[]> = this._store.items;

  abstract httpItems$: Observable<T[]>;

  ngOnInit(): void {
    this.httpItems$.subscribe((t) => this._store.addAll(t));
  }

  addNewItem() {
    this._store.addOne(this.randMethod());
  }

  removeItem(id: number) {
    this._store.deleteOne(id);
  }
}
