import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

@Pipe({ name: 'utilFunc', standalone: true })
export class UtilFunction implements PipeTransform {
  transform(
    functionName: string,
    arg1: string | number,
    arg2: boolean | number,
    arg3?: number
  ) {
    if (functionName === 'showName') {
      return PersonUtils.showName(arg1 as string, arg2 as number);
    }
    return PersonUtils.isAllowed(
      arg1 as number,
      arg2 as boolean,
      arg3 as number
    );
  }
}
