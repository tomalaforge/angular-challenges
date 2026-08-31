import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simplePipe',
})
export class SimplePipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
