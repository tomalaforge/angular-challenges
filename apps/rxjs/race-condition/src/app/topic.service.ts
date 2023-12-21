import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timer } from 'rxjs';

export type TopicType = 'Politic' | 'Sport' | 'Culture' | 'Nature';

@Injectable({ providedIn: 'root' })
export class TopicService {
  fakeGetHttpTopic = () =>
    timer(1000).pipe(
      switchMap(
        (): Observable<TopicType[]> => of(['Politic', 'Culture', 'Nature']),
      ),
    );
}
