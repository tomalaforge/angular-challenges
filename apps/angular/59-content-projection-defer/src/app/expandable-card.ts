import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-expandable-card',
  template: `
    <button
      class="text-fg-subtle hover:bg-button-secondary-bg-hover active:bg-button-secondary-bg-active focus:outline-button-border-highlight flex w-fit items-center gap-1 py-2 focus:outline focus:outline-2 focus:outline-offset-1"
      (click)="isExpanded.set(!isExpanded())"
      data-cy="expandable-panel-toggle">
      @if (isExpanded()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      } @else {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      }
      <ng-content select="[title]" />
    </button>

    <div
      class="overflow-hidden transition-[max-height] duration-500"
      [class.max-h-0]="!isExpanded()"
      [class.max-h-[1000px]]="isExpanded()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col gap-2 ',
  },
})
export class ExpandableCard {
  public isExpanded = signal(false);
}
