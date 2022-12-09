import { inject, Injectable } from '@angular/core';
import { first, forkJoin, map, mergeMap, Observable } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      first(),
      mergeMap((topicToDelete) => {
        return forkJoin(
          topicToDelete.map((t) => this.dbService.deleteOneTopic(t.id))
        ).pipe(
          map((deletedTopic) => deletedTopic.every((key) => key === true))
        );
      })
    );
  }
}
