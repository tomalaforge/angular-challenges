import { Pipe, PipeTransform } from '@angular/core';

export type Params = {
  seperator: string;
  keys: string[];
};

/*
 * Format string using provided keys and dynamic seperator.
 * Default seperator is '-'.
 * Usage:
 *  {{ 'val' | stringSeperator: { keys: [index] } }}
 *  formats to: val - indexValue
 * Example:
 *  {{ 'val' | stringSeperator: { seperator: ';', keys: [index, name] } }}
 *  formats to: val;indexValue;nameValue
 */
@Pipe({
  standalone: true,
  name: 'stringSeperator',
})
export class StringSeperatorPipe<T extends string, U extends Params>
  implements PipeTransform
{
  transform(value: T, args: U): string {
    if (!args) {
      return value;
    }

    return [value, ...args['keys']].join(args['seperator'] ?? ' - ');
  }
}
