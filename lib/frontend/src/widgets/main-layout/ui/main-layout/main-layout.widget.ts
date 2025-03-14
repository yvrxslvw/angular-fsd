import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Account, accountSlice } from '@entities/account';
import { LoginFeature, LogoutFeature, RegisterFeature } from '@features/account';
import { isAdmin } from '@shared/utils';
import { LoginDialog } from '../login-dialog';
import { RegisterDialog } from '../register-dialog';

@Component({
	selector: 'fsd-main-layout',
	imports: [RouterOutlet, RouterLink, AsyncPipe, LogoutFeature, LoginFeature, RegisterFeature],
	templateUrl: './main-layout.widget.html',
	styleUrl: './main-layout.widget.scss',
	host: {
		id: 'scrollWidget',
	},
})
export class MainLayoutWidget {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _store = inject(Store);

	protected readonly account$ = new BehaviorSubject<Account.Entity | null>(null);
	protected readonly isAdmin$ = new BehaviorSubject(false);

	protected readonly LoginDialog: Type<{}> = LoginDialog;
	protected readonly RegisterDialog: Type<{}> = RegisterDialog;

	constructor() {
		this._destroyRef.onDestroy(() => {
			this.account$.complete();
			this.isAdmin$.complete();
		});

		this._store
			.select(accountSlice.selectAccount)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((account) => {
				this.account$.next(account);
				this.isAdmin$.next(isAdmin(account));
			});
	}
}
