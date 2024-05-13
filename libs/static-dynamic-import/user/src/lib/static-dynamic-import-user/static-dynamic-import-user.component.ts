import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-static-dynamic-import-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './static-dynamic-import-user.component.html',
  styleUrl: './static-dynamic-import-user.component.css',
})
export class StaticDynamicImportUserComponent {}
