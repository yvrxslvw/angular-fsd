import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, Injector } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Account, accountApiActions, selectAccount } from '@entities/account';
import { DialogService } from '@shared/lib';
import { isAdmin } from '@shared/utils';
import { LoginDialog } from '@widgets/login-dialog';

@Component({
	selector: 'fsd-main-layout',
	imports: [RouterOutlet, RouterLink, AsyncPipe],
	templateUrl: './main-layout.widget.html',
	styleUrl: './main-layout.widget.scss',
})
export class MainLayoutWidget {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _store = inject(Store);
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);

	protected readonly account$ = new BehaviorSubject<Account.Entity | null>(null);
	protected readonly isAdmin$ = new BehaviorSubject(false);

	constructor() {
		this._destroyRef.onDestroy(() => {
			this.account$.complete();
			this.isAdmin$.complete();
		});

		this._store
			.select(selectAccount)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((account) => {
				this.account$.next(account);
				this.isAdmin$.next(isAdmin(account));
			});
	}

	protected handleClickLogin() {
		this._dialogService.open('Авторизация', LoginDialog, {}, this._injector);
	}

	protected handleClickLogout() {
		this._store.dispatch(accountApiActions.logout.request());
	}
}
