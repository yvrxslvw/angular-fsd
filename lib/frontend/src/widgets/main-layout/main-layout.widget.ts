import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Account, selectAccount } from '@entities/account';
import { isAdminUtil } from '@shared/utils';

@Component({
	selector: 'fsd-main-layout',
	imports: [RouterOutlet, RouterLink, AsyncPipe],
	templateUrl: './main-layout.widget.html',
	styleUrl: './main-layout.widget.scss',
})
export class MainLayoutWidget {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _store = inject(Store);

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
				if (account) this.isAdmin$.next(isAdminUtil(account));
			});
	}
}
