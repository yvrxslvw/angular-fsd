import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { skip } from 'rxjs';
import { UsersStore } from '@entities/user';
import { DynamicFormGroup } from '@shared/classes';
import { AlertService, AlertType, injectDialogContext } from '@shared/lib';
import { loginValidator, passwordMatchingValidator, passwordValidator } from '@shared/validators';

interface Form {
	login: string;
	password: string;
	passwordConfirm: string;
}

@Component({
	selector: 'fsd-create-user-dialog',
	templateUrl: './create-user.dialog.html',
	styleUrl: './create-user.dialog.scss',
	imports: [ReactiveFormsModule],
})
export class CreateUserDialog {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _dialogContext = injectDialogContext();
	private readonly _alertService = inject(AlertService);
	private readonly _usersStore = inject(UsersStore);

	protected readonly form = new DynamicFormGroup<Form>({
		values: {
			login: '',
			password: '',
			passwordConfirm: '',
		},
		options: {
			login: { validators: [Validators.required, loginValidator] },
			password: { validators: [Validators.required, passwordValidator] },
			passwordConfirm: { validators: [Validators.required] },
		},
		validators: [passwordMatchingValidator('password', 'passwordConfirm')],
	});

	constructor() {
		this._usersStore
			.getApiState$('post')
			.pipe(takeUntilDestroyed(this._destroyRef), skip(1))
			.subscribe(({ isLoading, error }) => {
				if (!isLoading && !error) this._dialogContext.close();
			});
	}

	protected handleSubmit() {
		const errors = this.form.validate();
		if (errors) {
			this._alertService.open(errors[0], AlertType.ERROR);
			return;
		}

		this._usersStore.post({
			login: this.form.value.login,
			password: this.form.value.password,
		});
	}
}
