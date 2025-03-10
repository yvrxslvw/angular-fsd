import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { accountApiActions, selectAccountIsLogged } from '@entities/account';
import { injectDialogContext } from '@shared/lib';

interface Form {
	login: FormControl<string>;
	password: FormControl<string>;
	rememberMe: FormControl<boolean>;
}

@Component({
	selector: 'fsd-login-dialog',
	templateUrl: './login.dialog.html',
	styleUrl: './login.dialog.scss',
	imports: [FormsModule, ReactiveFormsModule],
})
export class LoginDialog {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _dialogContext = injectDialogContext();
	private readonly _store = inject(Store);

	protected readonly form = new FormGroup<Form>({
		login: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		rememberMe: new FormControl(false, { nonNullable: true }),
	});

	constructor() {
		this._store
			.select(selectAccountIsLogged)
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
			accountApiActions.login.request({
				login: this.form.controls.login.value,
				password: this.form.controls.password.value,
				rememberMe: this.form.controls.rememberMe.value,
			}),
		);
	}
}
