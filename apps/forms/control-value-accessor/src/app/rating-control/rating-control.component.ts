import { Component, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      deps: [[new SkipSelf(), Optional, ControlContainer]],
      useFactory: (controlContainer: ControlContainer) => controlContainer,
    },
  ],
  imports: [FormsModule],
})
export class RatingControlComponent {
  value: number | null = null;

  setRating(index: number): void {
    this.value = index + 1;
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
}
