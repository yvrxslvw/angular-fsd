import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AccountApiService, AuthApiService } from '../api';
import { accountApiActions } from './account.actions';

@Injectable({
	providedIn: 'root',
})
export class AccountEffects {
	private readonly _actions$ = inject(Actions);
	private readonly _accountApiService = inject(AccountApiService);
	private readonly _authApiService = inject(AuthApiService);

	public getProfileEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountApiActions.get.request),
			exhaustMap(() =>
				this._accountApiService.get().pipe(
					map((account) => accountApiActions.get.fulfill({ account })),
					catchError(() => of(accountApiActions.get.reject())),
				),
			),
		),
	);

	public refreshEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountApiActions.refresh.request),
			exhaustMap(() =>
				this._authApiService.refresh().pipe(
					map((account) => accountApiActions.get.fulfill({ account })),
					catchError(() => of(accountApiActions.get.reject())),
				),
			),
		),
	);
}
