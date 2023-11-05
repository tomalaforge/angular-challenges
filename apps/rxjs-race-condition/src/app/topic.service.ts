import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, timer } from 'rxjs';

export type TopicType = 'Politic' | 'Sport' | 'Culture' | 'Nature';

@Injectable({ providedIn: 'root' })
export class TopicService {
  private topics$$ = new BehaviorSubject<{ topics: TopicType[] }>({
    topics: [],
  });

  topics$ = this.topics$$.asObservable();

  constructor() {
    this.init();
  }

  fakeGetHttpTopic = () =>
    timer(1000).pipe(map((): TopicType[] => ['Politic', 'Culture', 'Nature']));

  init() {
    this.fakeGetHttpTopic().subscribe((topics) => {
      const data = {
        topics,
      };
      this.topics$$.next(data);
    });
  }
}
