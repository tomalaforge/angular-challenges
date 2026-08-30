import {
  Component,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MANIFEST } from '../../generated/manifest';
import { Consent } from '../../consent';
import { SiteHeader } from '../../layout/site-header';

interface GithubUser {
  login: string;
  avatar: string;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink, SiteHeader],
  templateUrl: './landing.html',
})
export class Landing {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly consent = inject(Consent);

  protected readonly challengeCount = MANIFEST.challenges
    .flatMap((g) => g.items)
    .filter((i) => i.challengeNumber).length;

  protected readonly latestChallengeUrl = MANIFEST.challenges
    .flatMap((g) => g.items)
    .filter((i) => i.challengeNumber)
    .sort((a, b) => (b.challengeNumber ?? 0) - (a.challengeNumber ?? 0))[0]?.url;

  protected readonly statsResource = httpResource<{ stars: number; forks: number }>(() =>
    this.isBrowser ? '/api/stats' : undefined,
  );

  protected readonly sponsorsResource = httpResource<{ sponsors: GithubUser[] }>(() =>
    this.isBrowser ? '/api/sponsors' : undefined,
  );

  protected readonly sponsors = computed(
    () => this.sponsorsResource.value()?.sponsors ?? [],
  );

  protected readonly contributorsResource = httpResource<{ contributors: GithubUser[] }>(() =>
    this.isBrowser ? '/api/contributors' : undefined,
  );

  protected readonly contributors = computed(
    () => this.contributorsResource.value()?.contributors ?? [],
  );

  protected readonly cards = [
    {
      icon: 'zap',
      title: `${this.challengeCount} Challenges`,
      body: 'Real-life issues and specific features on Angular, Nx, RxJS, NgRx and TypeScript to elevate your skills.',
    },
    {
      icon: 'code',
      title: 'Browse every solution',
      body: 'Every community pull request is browsable right here — compare approaches with a side-by-side diff without leaving the site.',
    },
    {
      icon: 'branch',
      title: 'Become an OSS maintainer',
      body: 'These challenges lower the barrier to open source: you learn the fork/PR/review workflow used by every OSS project.',
    },
    {
      icon: 'users',
      title: 'Learn alongside others',
      body: 'Anyone can comment or offer assistance. Learning alone is great, but learning alongside others will get you further.',
    },
    {
      icon: 'plus',
      title: 'Contribute',
      body: 'An issue, an interesting bug, or an idea? Create your own challenge and get on the leaderboard.',
    },
    {
      icon: 'briefcase',
      title: 'Prepare for interviews',
      body: 'Completing these challenges gets you ready for the technical questions of your next Angular interview.',
    },
  ];

  constructor() {
    // SendPulse newsletter embed script (same form as the previous site).
    afterNextRender(() => {
      const script = document.createElement('script');
      script.src = '//web.webformscr.com/apps/fc3/build/default-handler.js?1705909791474';
      script.async = true;
      document.body.appendChild(script);
    });
  }
}
