import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { accountApiActions, accountSlice } from '@entities/account';
import { injectDialogContext } from '@shared/lib';
import { passwordMatchingValidator, passwordValidator } from '@shared/validators';

interface Form {
	login: FormControl<string>;
	password: FormControl<string>;
	confirmPassword: FormControl<string>;
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

	protected readonly form = new FormGroup<Form>(
		{
			login: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
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
