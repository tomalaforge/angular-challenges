import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FakeBackendService } from './fake-backend.service';
import { UserListComponent } from './user-list.component';
import { User } from './user.model';

@Component({
  selector: 'app-home',
  imports: [UserListComponent],
  template: `
    <div class="space-y-6">
      @if (usersResource.isLoading()) {
        <div
          class="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
          <div
            class="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
        </div>
      } @else {
        <app-user-list
          [users]="usersResource.value()"
          (add)="onAdd()"
          (edit)="onEdit($event)"
          (delete)="onDelete($event)" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private backend = inject(FakeBackendService);
  private router = inject(Router);

  usersResource = rxResource({
    stream: () => this.backend.getUsers(),
    defaultValue: [],
  });

  onAdd(): void {
    this.router.navigate(['/add']);
  }

  onEdit(user: User): void {
    this.router.navigate(['/edit', user.id]);
  }

  onDelete(id: number): void {
    this.backend.deleteUser(id).subscribe(() => {
      this.usersResource.reload();
    });
  }
}
