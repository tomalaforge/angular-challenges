import {
  Directive,
  EmbeddedViewRef,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngTemplateOutlet]',
  standalone: true,
})
// The directive is now waiting for a specific Type.
export class AppTemplateOutletDirective<T> implements OnChanges {
  private _viewRef: EmbeddedViewRef<T> | null = null;

  @Input() public ngTemplateOutletContext: T | null = null;

  @Input() public ngTemplateOutlet: TemplateRef<T> | null = null;

  @Input() public ngTemplateOutletInjector: Injector | null = null;

  constructor(private readonly _viewContainerRef: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ngTemplateOutlet'] || changes['ngTemplateOutletInjector']) {
      const viewContainerRef = this._viewContainerRef;

      if (this._viewRef) {
        viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
      }

      if (this.ngTemplateOutlet) {
        const {
          ngTemplateOutlet: template,
          ngTemplateOutletContext: context,
          ngTemplateOutletInjector: injector,
        } = this;
        this._viewRef = viewContainerRef.createEmbeddedView(
          template,
          context,
          injector ? { injector } : undefined,
        ) as EmbeddedViewRef<T> | null;
      } else {
        this._viewRef = null;
      }
    } else if (
      this._viewRef &&
      changes['ngTemplateOutletContext'] &&
      this.ngTemplateOutletContext
    ) {
      this._viewRef.context = this.ngTemplateOutletContext;
    }
  }
}
