import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './_shared/store/reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './auth/_shared/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideHttpClient(
      withInterceptors([httpInterceptor]),
    )
  ],
};
