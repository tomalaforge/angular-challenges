import { Injectable } from '@angular/core';
import { map, timer } from 'rxjs';

export type TopicType = 'Politic' | 'Sport' | 'Culture' | 'Nature';

@Injectable({ providedIn: 'root' })
export class TopicService {
  fakeGetHttpTopic = () =>
    timer(1000).pipe(map((): TopicType[] => ['Politic', 'Culture', 'Nature']));
}
