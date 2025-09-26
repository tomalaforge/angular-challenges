import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

interface ListStudentTemplateContext<Ctx> {
  $implicit: Ctx;
  appList: Ctx;
  index: number;
}

@Directive({
  selector: 'ng-template[listTemplateDirective]',
})
export class ListDirective<Ctx> {
  private readonly tpl =
    inject<TemplateRef<ListStudentTemplateContext<Ctx>>>(TemplateRef);

  private readonly vcr = inject(ViewContainerRef);

  @Input() set listOf(list: Ctx[] | readonly Ctx[] | null | undefined) {
    const arr = (list ?? []) as Ctx[];
    this.vcr.clear();
    arr.forEach((item, index) => {
      this.vcr.createEmbeddedView(this.tpl, {
        $implicit: item,
        appList: item,
        index,
      });
    });
  }

  static ngTemplateContextGuard<Ctx>(
    _dir: ListDirective<Ctx>,
    ctx: unknown,
  ): ctx is ListStudentTemplateContext<Ctx> {
    return true;
  }
}
