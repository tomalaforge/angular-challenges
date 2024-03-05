import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-100px)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: '*' })),
  ]),
]);

export const staggerAnimation = trigger('staggerAnimation', [
  transition(':enter', [
    query('.list-item', style({ opacity: 0 })),
    query(
      '.list-item',
      stagger('100ms', [
        animate(
          '300ms 200ms',
          keyframes([
            style({ opacity: 0, transform: 'translateX(-20px)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateX(10px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
          ]),
        ),
      ]),
    ),
  ]),
]);
