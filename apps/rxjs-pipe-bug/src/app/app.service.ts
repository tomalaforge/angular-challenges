import { inject, Injectable } from '@angular/core';
import { last, map, mergeMap, mergeScan, Observable, take } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  // prettier-ignore
  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      take(1),
      mergeMap(topicsToDelete => topicsToDelete.map(t => this.dbService.deleteOneTopic(t.id))),
      mergeScan((acc, value) => value.pipe(map(v => acc && v)), true),
      last()
    );
  }
}
