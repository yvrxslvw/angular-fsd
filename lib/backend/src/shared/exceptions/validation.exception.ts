import { ValidationError } from 'class-validator';

export class ValidationException {
	public readonly errors: string[];

	constructor(validationErrors: ValidationError[]) {
		const errors: string[] = [];
		validationErrors.forEach((e) => {
			if (!e.constraints) return;
			errors.push(...Object.values(e.constraints));
		});
		this.errors = errors;
	}
}
