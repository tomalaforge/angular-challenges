import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

interface Person {
  name: string;
}

class ContextType<T> {
  public get $implicit() {
    return this.ngFor;
  }
  public ngFor!: T;
}

@Directive({
  selector: '[ngFor]',
  standalone: true,
})
export class NgForDirective<T> implements OnInit {
  @Input('ngForOf') list!: Array<T>;
  @Input('ngForEmpty') emptyList!: TemplateRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<any>,
  ) {}

  ngOnInit(): void {
    if (this.list.length > 0) {
      this.list.forEach((item) => {
        const context = new ContextType<T>();
        context.ngFor = item;
        this.viewContainerRef.createEmbeddedView(this.template, context);
      });
    } else {
      this.viewContainerRef.createEmbeddedView(this.emptyList);
    }
  }
}

@Component({
  standalone: true,
  imports: [NgForDirective],
  selector: 'app-root',
  template: `
    <div *ngFor="let mydefault of persons; empty: emptyList">
      {{ mydefault.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [
    { name: 'Monica' },
    { name: 'Chandler' },
    { name: 'Phoebe' },
    { name: 'Joey' },
    { name: 'Rachel' },
    { name: 'Esther' },
    { name: 'Ross' },
  ];
}
