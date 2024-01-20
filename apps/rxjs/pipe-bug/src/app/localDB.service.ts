/* eslint-disable @typescript-eslint/member-ordering */
import { randomError } from '@angular-challenges/shared/utils';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { of } from 'rxjs';

export type TopicType = 'food' | 'book' | 'sport';

interface Info {
  id: number;
  topic: TopicType;
}

interface DBState {
  infos: Info[];
}

const initialState: DBState = {
  infos: [
    { id: 1, topic: 'book' },
    { id: 2, topic: 'book' },
    { id: 3, topic: 'book' },
    { id: 4, topic: 'book' },
    { id: 5, topic: 'food' },
    { id: 6, topic: 'food' },
    { id: 7, topic: 'book' },
    { id: 8, topic: 'book' },
    { id: 9, topic: 'book' },
    { id: 10, topic: 'sport' },
  ],
};

@Injectable({ providedIn: 'root' })
export class LocalDBService extends ComponentStore<DBState> {
  constructor() {
    super(initialState);
  }

  infos$ = this.select((state) => state.infos);

  searchByType = (type: TopicType) =>
    this.select((state) => state.infos.filter((i) => i.topic === type));

  deleteOne = this.updater(
    (state, id: number): DBState => ({
      infos: state.infos.filter((i) => i.id !== id),
    }),
  );

  deleteOneTopic = (id: number) =>
    randomError({
      success: () => {
        this.deleteOne(id);
        return of(true);
      },
      error: () => of(false),
    });
}
