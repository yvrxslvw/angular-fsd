import { ValidatorFn } from '@angular/forms';
import { emailRegex } from '@shared/regex';

export const emailValidator: ValidatorFn = (control) =>
	emailRegex.test(control.value) && control.value.length >= 6 && control.value.length <= 320 ? null : { email: true };
