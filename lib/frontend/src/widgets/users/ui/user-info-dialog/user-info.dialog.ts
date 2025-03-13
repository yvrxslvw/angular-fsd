import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { accountSlice } from '@entities/account';
import { User, UserInfoEntity } from '@entities/user';
import { injectDialogContext } from '@shared/lib';
import { isAdmin } from '@shared/utils';

interface DialogData {
	user: User.Entity;
}

@Component({
	selector: 'fsd-user-info-dialog',
	templateUrl: './user-info.dialog.html',
	styleUrl: './user-info.dialog.scss',
	imports: [UserInfoEntity, AsyncPipe],
})
export class UserInfoDialog {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _dialogContext = injectDialogContext<void, DialogData>();
	private readonly _store = inject(Store);

	protected readonly user = this._dialogContext.data.user;

	protected readonly isAdmin$$ = new BehaviorSubject(false);

	constructor() {
		this._destroyRef.onDestroy(() => {
			this.isAdmin$$.complete();
		});

		this._store
			.select(accountSlice.selectAccount)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((account) => {
				this.isAdmin$$.next(isAdmin(account));
			});
	}
}
