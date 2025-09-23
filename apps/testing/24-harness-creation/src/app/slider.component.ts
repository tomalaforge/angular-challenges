import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  template: `
    <mat-card class="items-center">
      <mat-card-content>
        <div class="flex items-center gap-10">
          <button id="minusButton" mat-mini-fab (click)="back()">
            <mat-icon>arrow_back_ios</mat-icon>
          </button>
          {{ minValue() }}
          <mat-slider
            class="m-4"
            [max]="maxValue()"
            [min]="minValue()"
            [disabled]="disabled()"
            [step]="step()">
            <input
              matSliderThumb
              [value]="value()"
              (valueChange)="value.set($event)" />
          </mat-slider>
          {{ maxValue() }}
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
  step = input(1);
  minValue = input(0);
  maxValue = input(100);
  disabled = input(false);

  value = signal(0);
  valueChange = output<number>();

  ngOnInit(): void {
    this.value.set(this.minValue());
  }

  back() {
    if (this.value() - this.step() >= this.minValue()) {
      this.value.update((v) => v - this.step());
    }
  }

  forward() {
    if (this.value() + this.step() <= this.maxValue()) {
      this.value.update((v) => v + this.step());
    }
  }
}
