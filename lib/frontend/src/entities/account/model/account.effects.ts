import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { AccountApiService } from '../api';
import { accountApiActions } from './account.actions';

@Injectable({
	providedIn: 'root',
})
export class AccountEffects {
	private readonly _actions$ = inject(Actions);
	private readonly _accountApiService = inject(AccountApiService);

	public getProfileEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(accountApiActions.get.request),
			exhaustMap(() => this._accountApiService.get().pipe(map((account) => accountApiActions.get.fulfill({ account })))),
		),
	);
}
