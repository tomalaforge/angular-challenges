/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { randNumber } from '@ngneat/falso';
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
    })
  );

  deleteOneTopic = (id: number) => {
    const randomNumber = randNumber({ min: 0.1, max: 1, fraction: 2 });
    if (randomNumber > 0.5) {
      this.deleteOne(id);
      return of(true);
    }
    return of(false);
  };
}
