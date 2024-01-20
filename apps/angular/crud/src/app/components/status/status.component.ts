import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span>{{ status }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {
  @Input({ required: true }) status!: string;
}
