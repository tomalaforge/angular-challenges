import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-paragraph',
  templateUrl: 'paragraph.component.html',
  styles: [],
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-20%)', opacity: 0 }),
        animate(
          '0.10s ease-in-out',
          style({ transform: 'translateX(10%)', opacity: 1 }),
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphComponent {
  data = input.required<{ title: string; content: string }>();
}
