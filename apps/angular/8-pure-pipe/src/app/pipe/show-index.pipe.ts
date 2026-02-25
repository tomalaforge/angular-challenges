import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showIndex',
})
export class ShowIndexPipe implements PipeTransform {
  transform(value: string, index: number): string {
    return `${value} ${index}`;
  }
}
