import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInFromLeft = trigger('fadeInFromLeft', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-100%)',
    }),
    animate(
      '500ms ease-out',
      style({
        opacity: 1,
        transform: 'translateX(0)',
      }),
    ),
  ]),
]);

export const listAnimation = trigger('listAnimation', [
  transition(':enter', [
    query('.list-item', [
      style({
        opacity: 0,
        transform: 'translateX(-50px)',
      }),
      stagger(100, [
        animate(
          '300ms ease-out',
          style({
            opacity: 1,
            transform: 'translateX(0)',
          }),
        ),
      ]),
    ]),
  ]),
]);
