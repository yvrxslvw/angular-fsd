import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthApiService } from '@entities/account';
import { API_URL } from '@shared/tokens';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const authApiService = inject(AuthApiService);
	const refreshUrl = inject(API_URL) + '/auth/refresh';

	return next(req.clone({ withCredentials: true })).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === 401 && error.url !== refreshUrl)
				return authApiService.refresh().pipe(
					switchMap(() => next(req.clone({ withCredentials: true }))),
					catchError(() => throwError(() => error)),
				);
			return throwError(() => error);
		}),
	);
};
