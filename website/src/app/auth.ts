import { Injectable, PLATFORM_ID, computed, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { httpResource } from '@angular/common/http';

export interface Me {
  login: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly meResource = httpResource<Me>(() =>
    this.isBrowser ? '/api/me' : undefined,
  );

  readonly me = computed<Me | null>(() =>
    this.meResource.error() ? null : (this.meResource.value() ?? null),
  );

  readonly pending = computed(() => this.meResource.isLoading());

  signInUrl(): string {
    const here = this.isBrowser ? location.pathname : '/';
    return `/auth/authorize?redirect_uri=${encodeURIComponent(here)}`;
  }

  signOutUrl(): string {
    const here = this.isBrowser ? location.pathname : '/';
    return `/auth/logout?redirect_uri=${encodeURIComponent(here)}`;
  }
}
