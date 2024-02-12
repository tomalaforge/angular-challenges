import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showName',
  standalone: true,
})
export class ShowNamePipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
