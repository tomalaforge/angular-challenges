import { Directive, HostListener, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormComponent } from '../ui/form.component';

@Directive({ selector: 'app-form[appUnloadGuard]', standalone: true })
export class UnloadGuardDirective {
  readonly component = inject(FormComponent);

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.component.form!.dirty;
  }
}
