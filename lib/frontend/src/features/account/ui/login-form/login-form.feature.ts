import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { accountApiActions, accountSlice } from '@entities/account';
import { DynamicFormGroup } from '@shared/classes';
import { AlertService, AlertType, injectDialogContext } from '@shared/lib';

interface Form {
	login: string;
	password: string;
	rememberMe: boolean;
}

@Component({
	selector: 'fsd-login-form-feature',
	templateUrl: './login-form.feature.html',
	styleUrl: './login-form.feature.scss',
	imports: [FormsModule, ReactiveFormsModule],
})
export class LoginFormFeature {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _dialogContext = injectDialogContext();
	private readonly _store = inject(Store);
	private readonly _alertService = inject(AlertService);

	protected readonly form = new DynamicFormGroup<Form>({
		values: {
			login: '',
			password: '',
			rememberMe: false,
		},
		options: {
			login: { validators: [Validators.required] },
			password: { validators: [Validators.required] },
		},
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

		this._store.dispatch(accountApiActions.login(this.form.value));
	}
}
