import { InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface ApiConfig {
  baseUrl: string;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

export function provideApiConfig() {
  return makeEnvironmentProviders([
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: '/api',
      } satisfies ApiConfig,
    },
  ]);
}
