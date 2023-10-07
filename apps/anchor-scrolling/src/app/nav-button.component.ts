/* eslint-disable @angular-eslint/component-selector */
import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'nav-button',
  standalone: true,
  template: `
    <a *ngIf="internalLink" [routerLink]="internalLink ? internalLink : null">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </a>
    <a *ngIf="externalLink" (click)="onClickScroll()">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </a>

    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
  imports: [RouterModule, CommonModule],
})
export class NavButtonComponent {
  constructor(private viewPortScroller: ViewportScroller) {}

  @Input() internalLink = '';
  @Input() externalLink = '';

  onClickScroll() {
    this.viewPortScroller.scrollToAnchor(this.externalLink);
  }
}
