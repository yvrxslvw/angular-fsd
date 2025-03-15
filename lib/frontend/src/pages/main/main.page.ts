import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicFormGroup } from '@shared/classes';
import { AlertService, AlertType } from '@shared/lib';
import { emailValidator, loginValidator, passwordMatchingValidator, passwordValidator } from '@shared/validators';

interface Form {
	email: string;
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
			email: '',
			login: 'test',
			password: '123',
			passwordConfirm: '321',
			ogoDisabled: 'hellooo',
			remember: false,
		},
		options: {
			email: { validators: [emailValidator], disabled: true },
			login: { validators: [Validators.required, loginValidator] },
			password: { validators: [Validators.required, passwordValidator] },
			passwordConfirm: { validators: [Validators.required] },
			ogoDisabled: { disabled: true },
		},
		validators: [passwordMatchingValidator('password', 'passwordConfirm')],
	});

	constructor() {
		this.form.patchValue({
			email: '',
			login: 'yvrxslvw',
			password: 'Test1234$',
			passwordConfirm: 'Test1234$',
			remember: true,
		});
		this.form.markCurrentValuesAsDefault();
		this.form.disable();
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

	protected handleClickToggleEnable() {
		this.form[this.form.enabled ? 'disable' : 'enable']();
	}
}
