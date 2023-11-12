import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showName',
  standalone: true,
})
export class ShowNamePipe implements PipeTransform {
  transform(personName: string, index: number): string {
    return `${personName} - ${index}`;
  }
}
