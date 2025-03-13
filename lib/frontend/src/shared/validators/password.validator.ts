import { ValidatorFn } from '@angular/forms';
import { passwordRegex } from '../regex';

export const passwordValidator: ValidatorFn = (control) => (passwordRegex.test(control.value) ? null : { password: true });
