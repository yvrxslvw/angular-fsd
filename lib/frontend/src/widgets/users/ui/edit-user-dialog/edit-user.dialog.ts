import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { skip } from 'rxjs';
import { User, UsersStore } from '@entities/user';
import { DynamicFormGroup } from '@shared/classes';
import { AlertService, AlertType, injectDialogContext } from '@shared/lib';
import { loginValidator, passwordValidator } from '@shared/validators';

interface DialogData {
	user: User.Entity;
}

interface Form {
	id: number;
	login: string;
	password: string;
}

@Component({
	selector: 'fsd-edit-user-dialog',
	templateUrl: './edit-user.dialog.html',
	styleUrl: './edit-user.dialog.scss',
	imports: [FormsModule, ReactiveFormsModule],
})
export class EditUserDialog {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _dialogContext = injectDialogContext<void, DialogData>();
	private readonly _alertService = inject(AlertService);
	private readonly _usersStore = inject(UsersStore);

	protected readonly form = new DynamicFormGroup<Form>({
		values: {
			id: this._dialogContext.data.user.id,
			login: this._dialogContext.data.user.login,
			password: '',
		},
		options: {
			id: { disabled: true },
			login: { validators: [Validators.required, loginValidator] },
			password: { validators: [passwordValidator] },
		},
	});

	constructor() {
		this._usersStore.isSuccess$.pipe(takeUntilDestroyed(this._destroyRef), skip(1)).subscribe((isSuccess) => {
			if (isSuccess) {
				this._alertService.open('Данные успешно обновлены', AlertType.SUCCESS);
				this._dialogContext.close();
			}
		});
	}

	protected handleSubmit() {
		const errors = this.form.validate();
		if (errors) {
			this._alertService.open(errors[0], AlertType.ERROR);
			return;
		}

		const request = this.form.getRawValue();
		this._usersStore.patch({
			...request,
			password: request.password || undefined,
		});
	}

	protected handleClickCancel() {
		this._dialogContext.close();
	}
}
