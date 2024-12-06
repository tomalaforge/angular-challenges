import { Component, Input, OnInit, Output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { skip } from 'rxjs';

@Component({
  selector: 'app-slider',
  template: `
    <mat-card class="items-center">
      <mat-card-content>
        <div class="flex items-center gap-10">
          <button id="minusButton" mat-mini-fab (click)="back()">
            <mat-icon>arrow_back_ios</mat-icon>
          </button>
          {{ minValue }}
          <mat-slider
            class="m-4"
            [max]="maxValue"
            [min]="minValue"
            [disabled]="disabled"
            [step]="step">
            <input
              matSliderThumb
              [value]="value()"
              (valueChange)="value.set($event)" />
          </mat-slider>
          {{ maxValue }}
          <button id="plusButton" mat-mini-fab (click)="forward()">
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

      .mat-mdc-card {
        margin-top: 8px;
        flex-direction: row;
      }
    `,
  ],
  imports: [MatCardModule, MatSliderModule, MatIconModule, FormsModule],
})
export class SliderComponent implements OnInit {
  @Input() step = 1;
  @Input() minValue = 0;
  @Input() maxValue = 100;
  @Input() disabled = false;

  value = signal(0);
  @Output() valueChange = toObservable(this.value).pipe(skip(1));

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
