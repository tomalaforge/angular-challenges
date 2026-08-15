import { Component, PLATFORM_ID, computed, effect, inject, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Auth } from '../../auth';

interface LeaderboardEntry {
  login: string;
  avatar: string;
  count: number;
}

const BOARDS: Record<string, { title: string; unit: string; intro: string; link: string }> = {
  answers: {
    title: 'Challenges answered',
    unit: 'challenges solved',
    intro: 'Join the list and start your Angular Challenges journey by reading the',
    link: '/guides/getting-started',
  },
  challenges: {
    title: 'Challenges created',
    unit: 'challenges created',
    intro: 'A challenge is missing? Create your own one and get on the leaderboard — read the',
    link: '/guides/create-challenge',
  },
  commit: {
    title: 'Contributions',
    unit: 'contributions',
    intro: 'Typos, docs, tooling — every contribution counts. Read the',
    link: '/guides/contribute',
  },
};

@Component({
  selector: 'app-leaderboard',
  imports: [RouterLink],
  templateUrl: './leaderboard.html',
})
export class Leaderboard {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly title = inject(Title);
  protected readonly auth = inject(Auth);

  /** Route param: answers | challenges | commit. */
  readonly board = input.required<string>();

  protected readonly config = computed(() => BOARDS[this.board()] ?? BOARDS['answers']);

  protected readonly boardResource = httpResource<{ entries: LeaderboardEntry[] }>(() =>
    this.isBrowser && BOARDS[this.board()] ? `/api/leaderboard/${this.board()}` : undefined,
  );

  protected readonly entries = computed(() => this.boardResource.value()?.entries ?? []);

  protected readonly myPosition = computed(() => {
    const login = this.auth.me()?.login;
    if (!login) {
      return null;
    }
    const index = this.entries().findIndex((e) => e.login === login);
    return index === -1 ? null : index + 1;
  });

  constructor() {
    effect(() => {
      this.title.setTitle(`${this.config().title} | Angular Challenges`);
    });
  }

  protected medal(index: number): string | null {
    return ['🥇', '🥈', '🥉'][index] ?? null;
  }
}
