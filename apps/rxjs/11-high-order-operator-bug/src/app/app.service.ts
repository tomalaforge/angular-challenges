import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { Info, LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAllInfo = this.dbService.infos;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    const deleteTopics = (infoByType: Info[]) => {
      const results$ = infoByType.map((t) =>
        this.dbService.deleteOneTopic(t.id),
      );
      return forkJoin(results$).pipe(
        map((results) => results.every((value) => value === true)),
      );
    };

    const infoByType = this.dbService.searchByType(type);
    return infoByType.length > 0 ? deleteTopics(infoByType) : of(true);
  }
}
