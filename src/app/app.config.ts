import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {routes} from './app.routes';
import {MAT_DATE_FORMATS, provideNativeDateAdapter} from '@angular/material/core';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {CS_DATE_FORMATS} from '../constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideNoopAnimations(),
    provideNativeDateAdapter(),
    {provide: LOCALE_ID, useValue: 'cs-CZ'},
    {provide: MAT_DATE_FORMATS, useValue: CS_DATE_FORMATS},
  ]
};
