import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore, Store } from '@ngrx/store';
import { accountActions, AccountEffects, accountSlice } from '@entities/account';
import { authInterceptor, backendErrorInterceptor, undefinedParamsInterceptor } from '@shared/interceptors';
import { AppStore } from '@shared/interfaces';
import { provideApiUrl, provideValidationErrors } from '@shared/providers';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(withInterceptors([undefinedParamsInterceptor, authInterceptor, backendErrorInterceptor])),
		provideApiUrl(),
		provideRouter(routes),
		provideStore<AppStore>({
			account: accountSlice.reducer,
		}),
		provideEffects([AccountEffects]),
		provideAppInitializer(() => {
			const store = inject(Store);
			store.dispatch(accountActions.getProfile());
		}),
		provideValidationErrors({
			required: 'Вы заполнили не все поля',
			email: 'Некорректный адрес электронной почты',
			login: 'Некорректный логин',
			password: 'Некорректный пароль',
			passwordConfirm: 'Пароли не совпадают',
		}),
	],
};
