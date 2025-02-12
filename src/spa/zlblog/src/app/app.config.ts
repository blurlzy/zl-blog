import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router';
// http module
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS, withFetch, } from '@angular/common/http';


// application root routes
import { routes } from './app.routes';

// quill editor module
import { provideQuillConfig } from 'ngx-quill/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import Counter from './counter'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withFetch(), 
      withInterceptorsFromDi(),
      // auth0 interceptor
      //withInterceptors([authHttpInterceptorFn])
      ),
    provideQuillConfig({
      // customModules: [{
      //   implementation: Counter,
      //   path: 'modules/counter'
      // }],      
      // customOptions: [{
      //   import: 'formats/font',
      //   whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      // }]
    }), provideAnimationsAsync()
  ]
};
