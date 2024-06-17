import { inject, Injectable } from '@angular/core';
import {
  merge,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      take(1),
      mergeMap((topicToDelete) =>
        topicToDelete.length > 0
          ? topicToDelete
              .map((t) => this.dbService.deleteOneTopic(t.id))
              .reduce((acc, curr) => {
                return merge(acc, curr).pipe(
                  switchMap((x) =>
                    !x ? throwError(() => new Error('error occured')) : of(x),
                  ),
                );
              }, of(true))
          : of(true),
      ),
    );
  }
}
