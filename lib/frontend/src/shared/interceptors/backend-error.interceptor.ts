import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { BackendException } from '@shared/interfaces';
import { AlertService, AlertType } from '@shared/lib';
import { API_URL } from '@shared/tokens';

export const backendErrorInterceptor: HttpInterceptorFn = (req, next) => {
	const alertService = inject(AlertService);
	const refreshUrl = inject(API_URL) + '/auth/refresh';

	return next(req).pipe(
		catchError((response: HttpErrorResponse | BackendException) => {
			if (response.status === 401 || response.url === refreshUrl) return throwError(() => response);
			else if (
				response.status === 400 &&
				'error' in response &&
				'messageUI' in response.error &&
				response.error.messageUI === 'Ошибка валидации'
			)
				alertService.open('Неизвестная ошибка', AlertType.ERROR);
			else if ('error' in response && 'messageUI' in response.error)
				alertService.open(response.error.messageUI, AlertType.ERROR);
			else alertService.open('Неизвестная ошибка', AlertType.ERROR);
			return throwError(() => response);
		}),
	);
};
