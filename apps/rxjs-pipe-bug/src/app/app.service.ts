import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, take } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      take(1),
      switchMap((topicToDelete) =>
        topicToDelete.length > 0
          ? forkJoin(
              topicToDelete.map((topic) =>
                this.dbService.deleteOneTopic(topic.id)
              )
            ).pipe(map((responses) => responses.every((res) => res)))
          : of(true)
      )
    );
  }
}
