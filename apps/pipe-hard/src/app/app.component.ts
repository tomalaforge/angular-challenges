import { NgFor } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Utils = { [key: string]: (...args: any[]) => any };

function execute<TUtils extends Utils, TFunction extends keyof TUtils>(
  utils: TUtils,
  functionName: TFunction,
  args: Parameters<typeof utils[TFunction]>
) {
  const func = utils[functionName];
  return func(...args);
}

export abstract class CallFunctionPipeBase<TUtils extends Utils> {
  constructor(private readonly utils: TUtils) {}

  transform(
    functionName: keyof TUtils,
    ...args: Parameters<TUtils[typeof functionName]>
  ) {
    return execute(this.utils, functionName, args);
  }
}

@Pipe({
  standalone: true,
  pure: true,
  name: 'personUtils',
})
export class CallPersonUtilsPipe
  extends CallFunctionPipeBase<typeof PersonUtils>
  implements PipeTransform
{
  constructor() {
    super(PersonUtils);
  }
}

@Component({
  standalone: true,
  imports: [NgFor, CallPersonUtilsPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let activity of activities">
      {{ activity.name }} :
      <div
        *ngFor="let person of persons; let index = index; let isFirst = first">
        {{ 'showName' | personUtils : person.name : index }}
        {{
          'isAllowed' | personUtils : person.age : isFirst : activity.minimumAge
        }}
      </div>
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  activities = [
    { name: 'biking', minimumAge: 12 },
    { name: 'hiking', minimumAge: 25 },
    { name: 'dancing', minimumAge: 1 },
  ];
}
