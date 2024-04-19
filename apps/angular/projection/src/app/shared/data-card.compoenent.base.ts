import { Directive, inject } from '@angular/core';
import { FakeHttpService } from '../data-access';
import { DataBase, DataStoreBase } from './data.store.base';

@Directive()
export abstract class DataCardComponentBase<T extends DataBase> {
  protected http = inject(FakeHttpService);
  protected store = inject(DataStoreBase<T>);

  protected $data = this.store.$data;

  abstract onAddNewItem(): void;

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
