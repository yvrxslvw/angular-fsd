import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AccountEffects, accountReducer } from '@entities/account';
import { environment } from '@shared/environments';
import { API_URL } from '@shared/tokens';
import { AppStore } from './app-store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(withInterceptorsFromDi()),
		provideRouter(routes),
		provideStore<AppStore>({
			account: accountReducer,
		}),
		provideEffects([AccountEffects]),

		{
			provide: API_URL,
			useValue: environment.apiUrl,
		},
	],
};
