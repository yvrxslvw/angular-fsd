import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore, Store } from '@ngrx/store';
import { accountApiActions, AccountEffects, accountSlice } from '@entities/account';
import { accountActions } from '@entities/account/model/account.actions';
import { authInterceptor, undefinedParamsInterceptor } from '@shared/interceptors';
import { AppStore } from '@shared/interfaces';
import { AlertService, AlertType } from '@shared/lib';
import { provideApiUrl } from '@shared/providers';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(withInterceptors([undefinedParamsInterceptor, authInterceptor])),
		provideApiUrl(),
		provideRouter(routes),
		provideStore<AppStore>({
			account: accountSlice.reducer,
		}),
		provideEffects([AccountEffects]),
		provideAppInitializer(() => {
			const store = inject(Store);
			const alertService = inject(AlertService);

			store.dispatch(accountApiActions.get());
			store.select(accountSlice.selectError).subscribe((error) => {
				if (error) {
					alertService.open(error, AlertType.ERROR);
					store.dispatch(accountActions.clearError());
				}
			});
		}),
	],
};
