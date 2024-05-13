import { inject, Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, take } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      take(1),
      mergeMap((topicToDelete) =>
        forkJoin(
          topicToDelete.map((t) => this.dbService.deleteOneTopic(t.id)),
        ).pipe(map((results) => results.every(Boolean))),
      ),
    );
  }
}
