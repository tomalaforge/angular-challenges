import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from '../person.utils';

@Pipe({
  name: 'utils',
  standalone: true,
})
export class UtilsPipe implements PipeTransform {
  transform(fnName: keyof typeof PersonUtils, ...args: any[]): string {
    // @ts-ignore
    return PersonUtils[fnName].apply(null, args);
  }
}
