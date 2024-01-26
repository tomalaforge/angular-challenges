import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'myPipe',
})
export class MyPipePipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
