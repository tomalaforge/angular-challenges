import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, timer } from 'rxjs';

export type TopicType = 'Politic' | 'Sport' | 'Culture' | 'Nature';

@Injectable({ providedIn: 'root' })
export class TopicService {
  topics$ = new BehaviorSubject<{ topics: TopicType[] }>({ topics: [] });

  constructor() {
    this.init();
  }

  fakeGetHttpTopic = () =>
    timer(1000).pipe(map((): TopicType[] => ['Politic', 'Culture', 'Nature']));

  init() {
    this.fakeGetHttpTopic().subscribe((topics) => {
      const data = {
        topics: topics,
      };
      this.topics$.next(data);
    });
  }

  getTopics() {
    return this.topics$;
  }
}
