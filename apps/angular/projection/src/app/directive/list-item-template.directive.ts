import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[appListItemTemplate]',
  standalone: true,
})
export class ListItemTemplateDirective {}
