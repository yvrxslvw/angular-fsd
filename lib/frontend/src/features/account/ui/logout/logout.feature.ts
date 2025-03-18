import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { accountApiActions } from '@entities/account';

@Component({
	selector: 'fsd-logout-feature',
	templateUrl: './logout.feature.html',
	styleUrl: './logout.feature.scss',
})
export class LogoutFeature {
	private readonly _store = inject(Store);

	public readonly login$$ = input.required<string>({ alias: 'login' });

	protected handleClick() {
		this._store.dispatch(accountApiActions.logout.request());
	}
}
