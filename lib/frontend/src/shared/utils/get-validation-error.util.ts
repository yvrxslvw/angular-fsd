import { FormControl, FormGroup } from '@angular/forms';
import { validationErrors } from '@shared/constants';

export const getValidationError = (formOrControl: FormGroup | FormControl) => {
	let error = '';
	if ('controls' in formOrControl) {
		if (formOrControl.errors) error = validationErrors[Object.keys(formOrControl.errors)[0]];
		Object.values(formOrControl.controls).forEach((control) => {
			if (control.errors) error = validationErrors[Object.keys(control.errors)[0]];
		});
	} else {
		if (formOrControl.errors) error = validationErrors[Object.keys(formOrControl.errors)[0]];
	}
	return error;
};
