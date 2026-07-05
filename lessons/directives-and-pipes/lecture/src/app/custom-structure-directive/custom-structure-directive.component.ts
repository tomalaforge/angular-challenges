import {
  AfterViewInit,
  Component,
  Directive,
  effect,
  inject,
  input,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Directive({
  selector: '[appRepeat]',
  standalone: true
})
export class RepeatDirective {
  private templateRef = inject(TemplateRef);
  private viewContainer =  inject(ViewContainerRef);

  readonly count = input(0, { alias: 'appRepeat' })

  constructor() {
    effect(() => {
      this.viewContainer.clear();
      for (let i = 0; i < (this.count() ?? 0); i++) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}

@Component({
  selector: 'app-custom-attribute-directive',
  imports: [FormsModule, RepeatDirective],
  templateUrl: './custom-structure-directive.html',
  styleUrls: ['./custom-structure-directive.css'],
})
export class CustomStructureDirectiveExample {
  starCount = 0;
}
