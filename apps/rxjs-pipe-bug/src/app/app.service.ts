import { inject, Injectable } from '@angular/core';
import {
  filter,
  map,
  mergeAll,
  mergeMap,
  Observable,
  take,
  toArray,
} from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      take(1),
      mergeAll(), // transform Info[] to Observable<Info>
      mergeMap((topicToDelete) =>
        this.dbService.deleteOneTopic(topicToDelete.id)
      ),
      filter((t) => !t), // filter on all value that failed to be deleted
      toArray(), // transform back our stream of Info to an array of Info
      map((t) => t.length === 0) // return true if all infos has been correctly deleted
    );
  }
}
