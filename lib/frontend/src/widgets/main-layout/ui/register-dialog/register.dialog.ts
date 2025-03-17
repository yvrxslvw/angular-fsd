import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { accountApiActions, accountSlice } from '@entities/account';
import { DynamicFormGroup } from '@shared/classes';
import { AlertService, AlertType, injectDialogContext } from '@shared/lib';
import { loginValidator, passwordMatchingValidator, passwordValidator } from '@shared/validators';

interface Form {
	login: string;
	password: string;
	confirmPassword: string;
}

@Component({
	selector: 'fsd-register-dialog',
	templateUrl: './register.dialog.html',
	styleUrl: './register.dialog.scss',
	imports: [FormsModule, ReactiveFormsModule],
})
export class RegisterDialog {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _dialogContext = injectDialogContext();
	private readonly _store = inject(Store);
	private readonly _alertService = inject(AlertService);

	protected readonly form = new DynamicFormGroup<Form>({
		values: {
			login: '',
			password: '',
			confirmPassword: '',
		},
		options: {
			login: { validators: [Validators.required, loginValidator] },
			password: { validators: [Validators.required, passwordValidator] },
			confirmPassword: { validators: [Validators.required] },
		},
		validators: [passwordMatchingValidator('password', 'confirmPassword')],
	});

	constructor() {
		this._store
			.select(accountSlice.selectIsLogged)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((isLogged) => {
				if (isLogged) this._dialogContext.close();
			});
	}

	protected handleSubmit() {
		const errors = this.form.validate();
		if (errors) {
			this._alertService.open(errors[0], AlertType.ERROR);
			return;
		}

		this._store.dispatch(accountApiActions.register(this.form.value));
	}
}
