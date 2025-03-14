import { Provider } from '@angular/core';
import { VALIDATION_ERRORS } from '@shared/tokens';

export const provideValidationErrors = (errors: Record<string, string>): Provider => ({
	provide: VALIDATION_ERRORS,
	useValue: errors,
});
