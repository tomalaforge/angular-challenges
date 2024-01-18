import { combineLatest, map, mapTo, Observable, startWith, timer } from 'rxjs';

/**
 * Delay the first emition of data$ value. Instead, it emits "true" until duration is elapsed
 */
export const nonFlickerLoader = (
  data$: Observable<boolean>,
  duration = 300,
): Observable<boolean> => {
  const isTrueWhileDuration$ = timer(duration).pipe(
    mapTo(false),
    startWith(true),
  );

  return combineLatest([data$, isTrueWhileDuration$]).pipe(
    map(([data, isTrueWhileDuration]) =>
      isTrueWhileDuration ? isTrueWhileDuration : data,
    ),
  );
};
