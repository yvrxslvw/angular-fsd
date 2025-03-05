import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AccountEffects, accountReducer } from '@entities/account';
import { CartEffects, cartReducer } from '@entities/cart';
import { TodoEffects, todoReducer } from '@entities/todo';
import { environment } from '@shared/environments';
import { undefinedParamsInterceptor } from '@shared/interceptors';
import { AppStore } from '@shared/interfaces';
import { API_URL } from '@shared/tokens';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(withInterceptors([undefinedParamsInterceptor])),
		provideRouter(routes),
		provideStore<AppStore>({
			todo: todoReducer,
			cart: cartReducer,
			account: accountReducer,
		}),
		provideEffects([TodoEffects, CartEffects, AccountEffects]),

		{
			provide: API_URL,
			useValue: environment.apiUrl,
		},
	],
};
