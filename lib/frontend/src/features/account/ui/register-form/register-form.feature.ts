import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { accountApiActions, accountSlice } from '@entities/account';
import { AlertService, AlertType, injectDialogContext } from '@shared/lib';
import { getValidationError } from '@shared/utils';
import { loginValidator, passwordMatchingValidator, passwordValidator } from '@shared/validators';

interface Form {
	login: FormControl<string>;
	password: FormControl<string>;
	confirmPassword: FormControl<string>;
}

@Component({
	selector: 'fsd-register-form-feature',
	templateUrl: './register-form.feature.html',
	styleUrl: './register-form.feature.scss',
	imports: [FormsModule, ReactiveFormsModule],
})
export class RegisterFormFeature {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _dialogContext = injectDialogContext();
	private readonly _store = inject(Store);
	private readonly _alertService = inject(AlertService);

	protected readonly form = new FormGroup<Form>(
		{
			login: new FormControl('', { nonNullable: true, validators: [Validators.required, loginValidator] }),
			password: new FormControl('', { nonNullable: true, validators: [Validators.required, passwordValidator] }),
			confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		},
		{ validators: [passwordMatchingValidator('password', 'confirmPassword')] },
	);

	constructor() {
		this._store
			.select(accountSlice.selectIsLogged)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((isLogged) => {
				if (isLogged) this._dialogContext.close();
			});
	}

	protected handleSubmit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			this.form.markAsDirty();
			this._alertService.open(getValidationError(this.form), AlertType.ERROR);
			return;
		}

		this._store.dispatch(
			accountApiActions.register({
				login: this.form.controls.login.value,
				password: this.form.controls.password.value,
			}),
		);
	}
}
