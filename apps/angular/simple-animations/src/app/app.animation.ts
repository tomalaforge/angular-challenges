import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const ANIMATIONS = [
  trigger('slideIn', [
    transition(':enter', [
      style({ transform: 'translateX(-30em)', opacity: 0 }),
      animate('1500ms ease-in', style({ transform: '*', opacity: '*' })),
    ]),
  ]),
  trigger('stagger', [
    transition(':enter', [
      query(':enter', [
        style({ transform: 'translateX(-30em)', opacity: 0 }),
        stagger(250, [
          animate('100ms ease-in', style({ transform: 'none', opacity: '*' })),
        ]),
      ]),
    ]),
  ]),
];
