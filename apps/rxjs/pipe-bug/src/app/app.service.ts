import { inject, Injectable } from '@angular/core';
import { merge, mergeMap, Observable, of, take } from 'rxjs';
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
              .reduce((acc, curr) => merge(acc, curr), of(true))
          : of(true),
      ),
    );
  }
}
