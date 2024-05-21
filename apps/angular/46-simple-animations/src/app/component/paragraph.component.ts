import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-paragraph',
  templateUrl: 'paragraph.component.html',
  animations: [
    trigger('movingAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-30%)', opacity: 0 }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateX(0%)', opacity: 1 }),
        ),
      ]),
    ]),
  ],
})
export class ParagraphComponent {
  data = input.required<{ title: string; content: string }>();
}
