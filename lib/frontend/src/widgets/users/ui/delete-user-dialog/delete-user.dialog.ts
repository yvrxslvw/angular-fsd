import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';
import { User, UsersStore } from '@entities/user';
import { injectDialogContext } from '@shared/lib';

interface DialogData {
	user: User.Entity;
}

@Component({
	selector: 'fsd-delete-user-dialog',
	templateUrl: './delete-user.dialog.html',
	styleUrl: './delete-user.dialog.scss',
})
export class DeleteUserDialog {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _dialogContext = injectDialogContext<boolean, DialogData>();
	private readonly _usersStore = inject(UsersStore);

	protected readonly user = this._dialogContext.data.user;

	constructor() {
		this._usersStore
			.getApiState$('delete')
			.pipe(takeUntilDestroyed(this._destroyRef), skip(1))
			.subscribe(({ isLoading, error }) => {
				if (!isLoading && !error) this._dialogContext.close(true);
			});
	}

	protected handleClickYes() {
		this._usersStore.delete({ id: this.user.id });
	}

	protected handleClickNo() {
		this._dialogContext.close(false);
	}
}
