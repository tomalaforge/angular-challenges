import { Component, PLATFORM_ID, computed, effect, inject, input } from '@angular/core';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Doc } from '../../doc.model';
import { Solution } from './solution.model';

@Component({
  selector: 'app-solutions-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './solutions-list.html',
})
export class SolutionsList {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly title = inject(Title);

  /** Provided by the route resolver via component input binding. */
  readonly doc = input.required<Doc>();

  protected readonly solutionsResource = httpResource<{ solutions: Solution[] }>(() =>
    this.isBrowser ? `/api/challenges/${this.doc().challengeNumber}/solutions` : undefined,
  );

  protected readonly solutions = computed(() => this.solutionsResource.value()?.solutions ?? []);

  /**
   * The resource is disabled during SSR, so it never reports "loading" there.
   * Templates branch on this instead: it stays false until a response arrives,
   * which keeps the server HTML from claiming that no solution exists.
   */
  protected readonly loaded = computed(() => this.solutionsResource.status() === 'resolved');

  protected readonly githubSearchUrl = computed(
    () =>
      `https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A${this.doc().challengeNumber}+label%3Aanswer`,
  );

  constructor() {
    effect(() => {
      this.title.setTitle(`Solutions — ${this.doc().title} | Angular Challenges`);
    });
  }
}
