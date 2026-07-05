import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, LowerCasePipe, PercentPipe, UpperCasePipe } from '@angular/common';

@Pipe({
  name: 'toUpperCase',
  pure: true,
})
export class ToUpperCasePipe implements PipeTransform {
  transform(value: string): string {
    console.log('отработал');
    return String(value).toUpperCase();
  }
}

@Component({
  imports: [
    DatePipe,
    UpperCasePipe,
    LowerCasePipe,
    CurrencyPipe,
    PercentPipe,
    // ToUpperCasePipe
  ],
  templateUrl: './default-pipes.html',
  styleUrl: './default-pipes.css',
})
export class DefaultPipes {
  currentDate: Date = new Date();
  sampleText: string = 'Angular Pipes Are Awesome!';
  price: number = 1234.56;
  rating: number = 0.8567;
  ratingSmall: number = 0.12345;

  array = signal(Array.from('1234'))
  toUppercase(str: string) {
    console.log('отработал');
    return str.toUpperCase();
  }

  updateArray() {
    this.array.update((arr => [...arr, 'x']))
  }
}
