import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, Observable, of, switchMap } from 'rxjs';
import { selectAccount } from '@entities/account';
import { CartApiService } from '../api';
import { cartApiActions } from './cart.actions';

interface ExtractedCompanyIdWithPayload<T> {
	companyId: string | null;
	payload: T;
}

@Injectable({
	providedIn: 'root',
})
export class CartEffects {
	readonly #store = inject(Store);
	readonly #actions$ = inject(Actions);
	readonly #cartApiService = inject(CartApiService);

	public getCartEffect$ = createEffect(() =>
		this.#actions$.pipe(
			ofType(cartApiActions.get),
			this.#extractCompanyId(),
			exhaustMap(({ companyId, payload }) =>
				this.#cartApiService.get({ companyId: companyId || undefined }).pipe(
					map((cart) => cartApiActions.getSuccess({ cart })),
					catchError(({ message }) => of(cartApiActions.getError({ error: message }))),
					finalize(() => console.warn(payload)),
				),
			),
		),
	);

	#extractCompanyId<T>() {
		return switchMap<T, Observable<ExtractedCompanyIdWithPayload<T>>>((payload) =>
			this.#store.select(selectAccount).pipe(map((state) => ({ companyId: state.selectedCompanyId, payload }))),
		);
	}
}
