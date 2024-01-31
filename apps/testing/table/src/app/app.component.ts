import { Component } from '@angular/core';
import { TableComponent } from './table.component';

@Component({
  standalone: true,
  imports: [TableComponent],
  selector: 'app-root',
  template: `
    <app-table />
  `,
})
export class AppComponent {}
