import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { accountApiActions } from '@entities/account';

@Component({
	selector: 'fsd-root',
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
})
export class AppComponent {
	private readonly _store = inject(Store);

	constructor() {
		this._store.dispatch(accountApiActions.get.request());
	}
}
