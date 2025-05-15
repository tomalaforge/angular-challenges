import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInAnimation = [
  trigger('horizontalAnimation', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' })),
    ]),
  ]),
];

export const staggerAnimation = [
  trigger('staggerAnimation', [
    transition(':enter', [
      query(
        '.list-item',
        [
          style({ opacity: 0, transform: 'translateY(-10px)' }),
          stagger(200, [
            animate('500ms ease-in', style({ opacity: 1, transform: 'none' })),
          ]),
        ],
        { optional: true },
      ),
    ]),
  ]),
];
