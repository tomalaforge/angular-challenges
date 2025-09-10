import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  pure: true,
  name: 'indexer',
})
export class IndexPipe implements PipeTransform {
  transform(value: string, index: number) {
    return `${value} - ${index}`;
  }
}
