import { InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface ApiConfig {
  baseUrl: string;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

export function provideApiConfig(config: ApiConfig = { baseUrl: '/api' }) {
  return makeEnvironmentProviders([
    {
      provide: API_CONFIG,
      useValue: config,
    },
  ]);
}
