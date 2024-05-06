import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = trigger('slideIn', [
  transition(':enter', [
    // start hidden and off to the left
    style({ opacity: 0, transform: 'translateX(-100px)' }),
    // end up fully visible and in the correct location
    // with a smooth ease-out
    animate('400ms ease-out'),
  ]),
]);

export const staggerInAnimation = trigger('staggerIn', [
  transition(':enter', [
    query(':enter', [
      // start each element hidden
      style({ opacity: 0 }),
      // stagger each element by 100ms
      stagger(100, [
        animate(
          // take a second for the whole transition, but end it
          // with a smooth ease-out
          '1000ms ease-out',
          keyframes([
            // start with each hidden and to the left
            style({ opacity: 0, transform: 'translateX(-50px)' }),
            // A bit of overshoot
            style({
              opacity: 0.5,
              transform: 'translateX(10px)',
            }),
            // end up at the expected position and fully dark
            style({ opacity: 1, transform: '*' }),
          ]),
        ),
      ]),
    ]),
  ]),
]);
