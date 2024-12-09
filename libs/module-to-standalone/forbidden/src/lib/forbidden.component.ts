import { Component } from '@angular/core';

@Component({
  selector: 'lib-home',
  standalone: true,
  template: `
    Forbidden component
  `,
  standalone: false,
})
export default class ForbiddenComponent {}
