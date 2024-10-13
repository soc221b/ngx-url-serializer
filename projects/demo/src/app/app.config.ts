import { ApplicationConfig } from '@angular/core';
import { UrlSerializer, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { QsUrlSerializer } from 'projects/ngx-url-serializer/src/lib/qs-url-serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: UrlSerializer,
      useClass: QsUrlSerializer,
    },
  ],
};
