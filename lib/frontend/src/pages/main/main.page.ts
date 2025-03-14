import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicFormGroup } from '@shared/classes';
import { AlertService, AlertType } from '@shared/lib';
import { loginValidator, passwordMatchingValidator, passwordValidator } from '@shared/validators';

interface Form {
	login: string;
	password: string;
	passwordConfirm: string;
	ogoDisabled: string;
	remember: boolean;
}

@Component({
	selector: 'fsd-main-page',
	templateUrl: './main.page.html',
	styleUrl: './main.page.scss',
	imports: [FormsModule, ReactiveFormsModule],
})
export class MainPage {
	private readonly _alertService = inject(AlertService);

	protected readonly form = new DynamicFormGroup<Form>({
		values: {
			login: 'test',
			password: '123',
			passwordConfirm: '321',
			ogoDisabled: 'hellooo',
			remember: false,
		},
		options: {
			login: { validators: [Validators.required, loginValidator] },
			password: { validators: [Validators.required, passwordValidator] },
			passwordConfirm: { validators: [Validators.required] },
			ogoDisabled: { disabled: true },
		},
		validators: [passwordMatchingValidator('password', 'passwordConfirm')],
	});

	constructor() {
		this.form.patchValue({
			login: 'changed',
			password: 'Test1234$',
			passwordConfirm: 'Test1234$',
			remember: true,
		});
		this.form.markCurrentValuesAsDefault();
	}

	protected handleSubmit() {
		const errors = this.form.validate();
		if (errors) {
			this._alertService.open(errors[0], AlertType.ERROR);
			return;
		}
		this._alertService.open('ура ура', AlertType.SUCCESS);
		console.warn('values', this.form.value);
		console.warn('changed', this.form.getChangedValues());
	}

	protected handleClickReset() {
		this.form.reset();
	}
}
