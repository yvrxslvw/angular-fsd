import { inject } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ValidatorFn } from '@angular/forms';
import { VALIDATION_ERRORS } from '@shared/tokens';

// Dynamic form control options
type ControlOptions<T> = {
	[key in keyof T]: Omit<FormControlOptions, 'nonNullable' | 'initialValueIsDefault'> & {
		disabled?: boolean;
	};
};

// Creation dynamic form group interface
interface DynamicFormGroupCreation<T> {
	values: T;
	options?: Partial<ControlOptions<T>>;
	validators?: ValidatorFn[];
}

export class DynamicFormGroup<T extends Record<keyof T, unknown>> extends FormGroup {
	// Inject localized validation errors
	private readonly validationErrors = inject(VALIDATION_ERRORS);

	// Default values by initialization (or forced)
	private defaultValues: T = {} as T;
	// Disabled control keys by default for validating disabled controls
	private readonly disabledKeys: string[] = [];

	// Type casting
	override value: T = {} as T;
	override controls: { [key in keyof T]: FormControl<T[key]> } = {} as { [key in keyof T]: FormControl<T[key]> };

	constructor(creation: DynamicFormGroupCreation<T>) {
		super({});

		// Add custom controls
		Object.keys(creation.values).forEach((k) => {
			const key = k as keyof T;
			const value = creation.values[key];
			const options = creation.options?.[key] || undefined;
			const control = new FormControl(value, options);
			if (options?.disabled) {
				control.disable();
				this.disabledKeys.push(k);
			}
			this.addControl(k, control);
		});
		// Force default values and add global validators
		this.markCurrentValuesAsDefault();
		this.addValidators(creation.validators || []);
	}

	// Validate form values based on form and control validators
	// (can validate disabled form controls by passing includeDisabled option)
	public validate(options?: { includeDisabled?: boolean }): string[] | null {
		const disabled = this.disabled;
		if (options?.includeDisabled) this.enable();
		this.markAllAsTouched();
		this.markAsDirty();
		const validationErrors: string[] = [];
		if (this.errors)
			validationErrors.push(
				...Object.keys(this.errors).reduce(
					(a, c) => [...a, this.validationErrors[c] || this.validationErrors['unknown']],
					validationErrors,
				),
			);
		Object.values(this.controls).forEach((c) => {
			const errors = (c as FormControl).errors;
			if (errors)
				validationErrors.push(
					...Object.keys(errors).reduce(
						(a, c) => [...a, this.validationErrors[c] || this.validationErrors['unknown']],
						validationErrors,
					),
				);
		});
		if (options?.includeDisabled) this.disabledKeys.forEach((k) => this.controls[k as keyof T].disable());
		if (disabled) this.disable();
		return validationErrors.length ? validationErrors : null;
	}

	// Force default values
	public markCurrentValuesAsDefault() {
		this.defaultValues = this.getRawValue();
	}

	// Get changed values (returns null even if control is dirty and has no changes)
	public getChangedValues(): Partial<T> | null {
		const values: Partial<T> = {};
		Object.keys(this.controls).forEach((k) => {
			const control = this.controls[k as keyof T];
			const defaultValue = this.defaultValues[k as keyof T];
			if (control.dirty && control.value !== defaultValue) values[k as keyof T] = control.value;
		});
		return Object.keys(values).length ? values : null;
	}

	// Override reset method, resets to default values
	override reset() {
		this.patchValue(this.defaultValues);
		this.markAsPristine();
	}

	// Override enable, enables only unblocked controls by default. Can be forced by `includeDefaultDisabled: true`
	override enable(options?: { onlySelf?: boolean; emitEvent?: boolean; includeDefaultDisabled?: boolean }) {
		super.enable(options);
		if (!options?.includeDefaultDisabled) this.disabledKeys.forEach((k) => this.controls[k as keyof T].disable());
	}

	// Type cast override
	override setValue(
		value: T,
		options?: {
			onlySelf?: boolean;
			emitEvent?: boolean;
		},
	) {
		super.setValue(value, options);
	}

	// Type cast override
	override patchValue(
		value: Partial<T>,
		options?: {
			onlySelf?: boolean;
			emitEvent?: boolean;
		},
	) {
		super.patchValue(value, options);
	}
}
