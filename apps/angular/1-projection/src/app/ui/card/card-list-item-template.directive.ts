import { Directive, TemplateRef, inject } from '@angular/core';
import { City } from '../../model/city.model';
import { Student } from '../../model/student.model';
import { Teacher } from '../../model/teacher.model';

type CardItem = Student | City | Teacher;

@Directive({
  selector: 'ng-template[appCardListItem]',
  exportAs: 'appCardListItem',
})
export class CardListItemTemplateDirective {
  template: TemplateRef<{ $implicit: CardItem; item: CardItem }> =
    inject(TemplateRef);
}
