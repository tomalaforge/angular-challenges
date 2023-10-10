import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

@Pipe({ name: 'utilFunc', standalone: true })
export class UtilFunction implements PipeTransform {
  transform(functionName: string, arg1: any, arg2: any, arg3?: any) {
    if (functionName === 'showName') {
      return PersonUtils.showName(arg1, arg2);
    }
    return PersonUtils.isAllowed(arg1, arg2, arg3);
  }
}
