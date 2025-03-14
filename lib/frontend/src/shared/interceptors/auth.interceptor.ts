import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthApiService } from '@entities/account';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const authApiService = inject(AuthApiService);

	return next(req.clone({ withCredentials: true })).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === 401)
				return authApiService.refresh().pipe(
					switchMap(() => next(req.clone({ withCredentials: true }))),
					catchError(() => throwError(() => error)),
				);
			return throwError(() => error);
		}),
	);
};
