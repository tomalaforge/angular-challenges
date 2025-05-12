import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-item',
  imports: [MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content />
    <button (click)="update.emit()" [disabled]="loadingAction">Update</button>
    <button (click)="delete.emit()" [disabled]="loadingAction">Delete</button>
    @if (loadingAction) {
      <mat-spinner diameter="25" />
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 8px;
      }
    `,
  ],
})
export class ItemComponent {
  @Input() loadingAction!: boolean | null;

  readonly update = output<void>();
  readonly delete = output<void>();
}
