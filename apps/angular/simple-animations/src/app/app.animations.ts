import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const blockEnter = trigger('blockEnter', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('300ms', style({ transform: '*' })),
  ]),
]);

export const cascadeEnter = trigger('cascadeEnter', [
  transition(':enter', [
    query('.list-item', [
      style({ opacity: 0 }),
      stagger('100ms', [
        animate(
          '500ms 100ms',
          keyframes([
            style({ opacity: 0, transform: 'translateX(-50px)' }),
            style({
              opacity: 0.5,
              transform: 'translateX(120px)',
            }),
            style({ opacity: 1, transform: '*' }),
          ]),
        ),
      ]),
    ]),
  ]),
]);
