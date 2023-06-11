import { Component, Input, OnInit, Output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  template: `
    <mat-card class="flex">
      <mat-card-content>
        <div class="flex gap-10 items-center">
          <button mat-mini-fab (click)="back()">
            <mat-icon>arrow_back_ios</mat-icon>
          </button>
          {{ minValue }}
          <mat-slider
            class="m-4"
            [max]="maxValue"
            [min]="minValue"
            [step]="step">
            <input matSliderThumb [value]="value()" />
          </mat-slider>
          {{ maxValue }}
          <button mat-mini-fab (click)="forward()">
            <mat-icon>arrow_forward_ios</mat-icon>
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .mat-mdc-slider {
        max-width: 300px;
        width: 100%;
      }

      .mat-mdc-card + .mat-mdc-card {
        margin-top: 8px;
      }
    `,
  ],
  standalone: true,
  imports: [MatCardModule, FormsModule, MatSliderModule, MatIconModule],
})
export class SliderComponent implements OnInit {
  @Input() step = 1;
  @Input() minValue = 0;
  @Input() maxValue = 100;

  value = signal(0);
  @Output() valueChange = toObservable(this.value);

  ngOnInit(): void {
    this.value.set(this.minValue);
  }

  back() {
    if (this.value() - this.step >= this.minValue) {
      this.value.update((v) => v - this.step);
    }
  }

  forward() {
    if (this.value() + this.step <= this.maxValue) {
      this.value.update((v) => v + this.step);
    }
  }
}
