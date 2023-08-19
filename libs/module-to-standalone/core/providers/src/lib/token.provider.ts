import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';

export const TOKEN = new InjectionToken<string>('token');

export const provideToken = (token: string): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: TOKEN,
      useValue: token,
    },
  ]);
};
