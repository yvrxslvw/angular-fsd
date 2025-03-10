import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore, Store } from '@ngrx/store';
import { accountApiActions, AccountEffects, accountReducer } from '@entities/account';
import { authInterceptor, undefinedParamsInterceptor } from '@shared/interceptors';
import { AppStore } from '@shared/interfaces';
import { provideApiUrl } from '@shared/providers';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(withInterceptors([undefinedParamsInterceptor, authInterceptor])),
		provideApiUrl(),
		provideRouter(routes),
		provideStore<AppStore>({
			account: accountReducer,
		}),
		provideEffects([AccountEffects]),
		provideAppInitializer(() => {
			const store = inject(Store);
			store.dispatch(accountApiActions.get.request());
		}),
	],
};
