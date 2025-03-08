import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { accountApiActions } from '@entities/account';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const store = inject(Store);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === 401) store.dispatch(accountApiActions.refresh.request());
			return throwError(() => error);
		}),
	);
};
