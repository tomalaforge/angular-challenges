import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { LoadingComponent } from './loading.component';

@Directive({
  standalone: true,
  selector: '[appLoadingIf]',
})
export class LoadingDirective {
  #viewContainer = inject(ViewContainerRef);
  #template = inject(TemplateRef<any>);

  @Input() set loading(value: boolean) {
    this.#viewContainer.clear();
    if (value) {
      this.#viewContainer.createComponent(LoadingComponent);
    } else {
      this.#viewContainer.createEmbeddedView(this.#template);
    }
  }

  constructor() {
    this.#viewContainer.clear();
  }
}
