import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { BaseDialogComponent } from '../base-dialog';

@Component({
  selector: 'app-sensitive-dialog',
  templateUrl: './sensitive-dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensitiveDialogComponent extends BaseDialogComponent {
  constructor() {
    super();
  }
}
