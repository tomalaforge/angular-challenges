import { Directive } from '@angular/core';

@Directive({
  selector: '[add-button]',
})
export class AddButton {}

@Directive({
  selector: '[delete-button]',
})
export class DeleteButton {}

@Directive({
  selector: '[image]',
})
export class Image {}
