import { inject, Injectable } from '@angular/core';
import {
  filter,
  map,
  mergeAll,
  mergeMap,
  Observable,
  take,
  tap,
  toArray,
} from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      take(1),
      mergeAll(),
      mergeMap((topicToDelete) =>
        this.dbService.deleteOneTopic(topicToDelete.id)
      ),
      filter((topics) => !topics),
      toArray(),
      map((topics) => {
        return topics.length === 0;
      })
    );
  }
}
