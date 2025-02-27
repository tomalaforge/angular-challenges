import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAllInfo = this.dbService.infos;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    const infoByType = this.dbService.searchByType(type);

    if (infoByType.length === 0) {
      return of(true);
    }

    // Use combineLatest to wait for all deletion operations and check if they all succeeded
    return combineLatest(
      infoByType.map((info) => this.dbService.deleteOneTopic(info.id)),
    ).pipe(map((results) => results.every((result) => result === true)));
  }
}
