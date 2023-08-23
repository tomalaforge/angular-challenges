import { inject, Injectable } from '@angular/core';
import { concatMap, map, mergeAll, Observable, of, take, toArray } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      take(1),
      concatMap((topicToDelete) =>
        topicToDelete.length > 0
          ? of(topicToDelete).pipe(
              mergeAll(),
              concatMap((t) => this.dbService.deleteOneTopic(t.id)),
              toArray(),
              map((t) => t.reduce((acc, curr) => (!curr ? curr : acc), true))
            )
          : of(true)
      )
    );
  }
}
