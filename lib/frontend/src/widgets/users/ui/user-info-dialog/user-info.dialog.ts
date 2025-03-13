import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { accountSlice } from '@entities/account';
import { User, UserInfoEntity } from '@entities/user';
import { DeleteUserFeature, EditUserFeature } from '@features/user';
import { injectDialogContext } from '@shared/lib';
import { isAdmin } from '@shared/utils';
import { DeleteUserDialog } from '../delete-user-dialog';
import { EditUserDialog } from '../edit-user-dialog';

interface DialogData {
	user: User.Entity;
}

@Component({
	selector: 'fsd-user-info-dialog',
	templateUrl: './user-info.dialog.html',
	styleUrl: './user-info.dialog.scss',
	imports: [UserInfoEntity, AsyncPipe, EditUserFeature, DeleteUserFeature],
})
export class UserInfoDialog {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _dialogContext = injectDialogContext<void, DialogData>();
	private readonly _store = inject(Store);

	protected readonly isAdmin$$ = new BehaviorSubject(false);

	protected readonly user = this._dialogContext.data.user;
	protected readonly DeleteUserDialog: Type<{}> = DeleteUserDialog;
	protected readonly EditUserDialog: Type<{}> = EditUserDialog;

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

	protected handleDelete() {
		this._dialogContext.close();
	}
}
