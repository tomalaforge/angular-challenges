import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToText',
  standalone: true
})
export class ArrayToTextPipe implements PipeTransform {

  transform(value: string, index: number , ...args: unknown[]): string {
    return `${value} - ${index}`;
  }

}
