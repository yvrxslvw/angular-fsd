import { ValidatorFn } from '@angular/forms';
import { loginRegex } from '../regex';

export const loginValidator: ValidatorFn = (control) => (loginRegex.test(control.value) ? null : { login: true });
