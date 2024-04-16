import { Directive } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { FakeHttpService } from '../data-access/fake-http.service';
import { DataBase, DataStoreBase } from './data.store.base';

@Directive()
export abstract class DataCardComponentBase<T extends DataBase> {
  data$: Observable<T[]> = this.store.data$.pipe(startWith([]));

  constructor(
    protected http: FakeHttpService,
    protected store: DataStoreBase<T>,
  ) {}

  abstract onAddNewItem(): void;

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
