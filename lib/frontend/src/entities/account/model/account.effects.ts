import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BackendException } from '@shared/interfaces';
import { AccountApiService, AuthApiService } from '../api';
import { accountActions, accountApiActions } from './account.actions';

@Injectable({
	providedIn: 'root',
})
export class AccountEffects {
	private readonly _actions$ = inject(Actions);
	private readonly _accountApiService = inject(AccountApiService);
	private readonly _authApiService = inject(AuthApiService);

	public readonly getProfileEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountActions.getProfile),
			exhaustMap(() =>
				this._accountApiService.get().pipe(
					map((account) => accountApiActions.getProfileSuccess({ account })),
					catchError(({ error: { messageUI } }: BackendException) =>
						of(accountApiActions.getProfileError({ error: messageUI })),
					),
				),
			),
		),
	);

	public readonly loginEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountActions.login),
			exhaustMap(({ login, password, rememberMe }) =>
				this._authApiService.login({ login, password, rememberMe }).pipe(
					map((account) => accountApiActions.loginSuccess({ account })),
					catchError(({ error: { messageUI } }: BackendException) => of(accountApiActions.loginError({ error: messageUI }))),
				),
			),
		),
	);

	public readonly registerEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountActions.register),
			exhaustMap(({ login, password }) =>
				this._authApiService.register({ login, password }).pipe(
					map((account) => accountApiActions.registerSuccess({ account })),
					catchError(({ error: { messageUI } }: BackendException) => of(accountApiActions.registerError({ error: messageUI }))),
				),
			),
		),
	);

	public readonly refreshEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountActions.refresh),
			exhaustMap(() =>
				this._authApiService.refresh().pipe(
					map((account) => accountApiActions.refreshSuccess({ account })),
					catchError(({ error: { messageUI } }: BackendException) => of(accountApiActions.refreshError({ error: messageUI }))),
				),
			),
		),
	);

	public readonly logoutEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountActions.logout),
			exhaustMap(() =>
				this._authApiService.logout().pipe(
					map(() => accountApiActions.logoutSuccess()),
					catchError(({ error: { messageUI } }: BackendException) => of(accountApiActions.logoutError({ error: messageUI }))),
				),
			),
		),
	);
}
