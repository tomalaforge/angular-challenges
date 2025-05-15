import { inject, Injectable } from '@angular/core';
import { filter, from, map, mergeMap, Observable, of, toArray } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAllInfo = this.dbService.infos;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    const infoByType = this.dbService.searchByType(type);

    if (!infoByType.length) {
      return of(true);
    }

    return from(infoByType).pipe(
      mergeMap((topic) => this.dbService.deleteOneTopic(topic.id)),
      filter((topic) => !topic),
      toArray(),
      map((t) => t.length === 0),
    );
  }
}
