import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  standalone: true,
  template: `
    <section>
      <h1>{{ title() }}</h1>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  title = toSignal(inject(ActivatedRoute).data.pipe(map((d) => d['title'])));
}
