import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of } from 'rxjs';
import { BackendException } from '@shared/interfaces';
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
			ofType(accountApiActions.get),
			exhaustMap(() =>
				this._accountApiService.get().pipe(
					map((account) => accountApiActions.fulfill({ account })),
					catchError(() => EMPTY),
				),
			),
		),
	);

	public loginEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountApiActions.login),
			exhaustMap(({ login, password, rememberMe }) =>
				this._authApiService.login({ login, password, rememberMe }).pipe(
					map((account) => accountApiActions.fulfill({ account })),
					catchError(({ error: { messageUI } }: BackendException) => of(accountApiActions.reject({ error: messageUI }))),
				),
			),
		),
	);

	public registerEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountApiActions.register),
			exhaustMap(({ login, password }) =>
				this._authApiService.register({ login, password }).pipe(
					map((account) => accountApiActions.fulfill({ account })),
					catchError(({ error: { messageUI } }: BackendException) => of(accountApiActions.reject({ error: messageUI }))),
				),
			),
		),
	);

	public logoutEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountApiActions.logout),
			exhaustMap(() =>
				this._authApiService.logout().pipe(
					map(() => accountApiActions.fulfillLogout()),
					catchError(({ error: { messageUI } }: BackendException) => of(accountApiActions.reject({ error: messageUI }))),
				),
			),
		),
	);

	public refreshEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountApiActions.refresh),
			exhaustMap(() =>
				this._authApiService.refresh().pipe(
					map((account) => accountApiActions.fulfill({ account })),
					catchError(() => EMPTY),
				),
			),
		),
	);
}
