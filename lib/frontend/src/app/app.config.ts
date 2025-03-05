import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AccountEffects, accountReducer } from '@entities/account';
import { cartReducer } from '@entities/cart';
import { CartEffects } from '@entities/cart/model/cart.effects';
import { TodoEffects, todoReducer } from '@entities/todo';
import { environment } from '@shared/environments';
import { AppStore } from '@shared/interfaces';
import { API_URL } from '@shared/tokens';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(withInterceptorsFromDi()),
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
