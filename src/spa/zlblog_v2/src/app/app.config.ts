import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { GlobalErrorHandler } from './core/services/error-handler.service';
import { provideRouter } from '@angular/router';
// http module
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS, withFetch, withInterceptors } from '@angular/common/http';
// auth0 integration
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
// import { AllowList } from './auth/auth0-config';

// quill editor module
import { provideQuillConfig } from 'ngx-quill/config';
// env
import { environment } from '../environments/environment';
// services
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      // auth0 interceptor
      //withInterceptors([authHttpInterceptorFn])
    ),
    provideQuillConfig({
      
    }), 
    // show loader on http requests
    //{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: NotFoundInterceptor, multi: true },
    // global error handler
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
