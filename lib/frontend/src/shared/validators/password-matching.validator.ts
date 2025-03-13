import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export const passwordMatchingValidator =
	(passwordControlName: string, confirmPasswordControlName: string) =>
	(form: AbstractControl): ValidationErrors | null => {
		const controls = (form as FormGroup).controls;
		return controls[passwordControlName].value !== controls[confirmPasswordControlName].value
			? { passwordConfirm: true }
			: null;
	};
