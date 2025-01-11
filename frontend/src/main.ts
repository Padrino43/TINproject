import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { APP_ROUTES } from './app/app-routes';
import { AuthModule } from './app/modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { spinnerInterceptor } from './app/modules/core/interceptors/spinner.interceptor';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AuthModule,
      BrowserAnimationsModule,
      HttpClientModule
    ),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([spinnerInterceptor])),
  ],
}).catch((err) => console.error());
