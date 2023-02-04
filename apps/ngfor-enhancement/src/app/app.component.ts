import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Directive,
  DoCheck,
  EmbeddedViewRef,
  inject,
  Input,
  OnInit,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';

interface Person {
  name: string;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngForEach]', // same selector as NgForOf Directive of CommonModule
  standalone: true,
  hostDirectives: [
    {
      directive: NgFor,
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ['ngForOf:ngForEachOf'],
    },
  ],
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NgForEach<T> implements DoCheck {
  private vcr = inject(ViewContainerRef);

  private ngFor = inject(NgFor, { host: true });

  // same input as ngFor, we just need it to check if list is empty
  @Input() ngForEachOf?: T[] = undefined;

  // reference of the empty template to display
  @Input() ngForEachEmpty!: TemplateRef<unknown>;

  // reference of the loading template to display
  @Input() ngForEachLoading!: TemplateRef<unknown>;

  // reference of the embeddedView of our empty template
  private emptyTemplateRef?: EmbeddedViewRef<unknown>;

  // reference of the embeddedView of our loading template
  private loadingTemplateRef?: EmbeddedViewRef<unknown>;

  // Input for trackBy function to juss pass string to track
  @Input()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set ngForEachTrackBy(trackByFnOrKey: keyof T | ((idx: number, i: T) => any)) {
    if (
      trackByFnOrKey !== null &&
      typeof trackByFnOrKey !== 'string' &&
      typeof trackByFnOrKey !== 'function'
    ) {
      console.warn(
        `trackBy must be a function, but received ${JSON.stringify(
          trackByFnOrKey
        )}.`
      );
    }
    this.ngFor.ngForTrackBy =
      typeof trackByFnOrKey !== 'function'
        ? (i: number, a: T) => a[trackByFnOrKey]
        : trackByFnOrKey;
  }

  // use ngDoChange if you are never mutating data in your app
  ngDoCheck(): void {
    this.emptyTemplateRef?.destroy();
    this.loadingTemplateRef?.destroy();

    if (this.ngForEachOf === undefined) {
      this.loadingTemplateRef = this.vcr.createEmbeddedView(
        this.ngForEachLoading
      );
      return;
    }

    if (!this.ngForEachOf || this.ngForEachOf.length === 0) {
      this.vcr.clear();
      this.emptyTemplateRef = this.vcr.createEmbeddedView(this.ngForEachEmpty);
      return;
    }
  }
}

@Component({
  standalone: true,
  imports: [NgForEach, NgIf],
  selector: 'app-root',
  template: `
    <div
      *ngForEach="
        let person of persons;
        loading: loading;
        empty: emptyList;
        trackBy: trackByFn
      ">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
    <ng-template #loading>loading..</ng-template>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  persons!: Person[];
  trackByFn: TrackByFunction<Person> = (index: number, item: Person) => {
    console.log(item, index);
  };

  ngOnInit(): void {
    setTimeout(() => {
      this.persons = [];
      this.persons.push({ name: 'hi' });
    }, 3000);

    setTimeout(() => {
      this.persons = [];
    }, 6000);
  }
}
