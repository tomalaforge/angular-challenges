import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
  standalone: true,
})
export class JoinPipe implements PipeTransform {
  transform(separator: string, ...args: (number | string | boolean)[]): string {
    return args
      .map((arg) => arg.toString())
      .reduce((sofar, curr) => `${sofar} ${separator} ${curr}`);
  }
}
