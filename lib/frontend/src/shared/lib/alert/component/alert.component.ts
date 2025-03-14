import { Component, input } from '@angular/core';
import { IconComponent } from '@shared/components';
import { AlertType } from '../enums';
import { Alert } from '../interfaces';

@Component({
	selector: 'fsd-alert-component',
	templateUrl: './alert.component.html',
	styleUrl: './alert.component.scss',
	imports: [IconComponent],
	host: {
		'[style]': "'--color: ' + alertTypeColor + ';'",
		'(click)': 'handleClickAlert()',
	},
})
export class AlertComponent {
	public readonly alert$$ = input.required<Alert>({ alias: 'alert' });

	protected get alertTypeIcon() {
		switch (this.alert$$().type) {
			case AlertType.SUCCESS:
				return 'circle-check';
			case AlertType.WARNING:
				return 'info';
			case AlertType.ERROR:
				return 'circle-alert';
		}
	}

	protected get alertTypeColor() {
		switch (this.alert$$().type) {
			case AlertType.SUCCESS:
				return '#42a462';
			case AlertType.WARNING:
				return '#c0a645';
			case AlertType.ERROR:
				return '#be4646';
		}
	}

	protected handleClickAlert() {
		console.warn('click', this.alert$$().id);
	}
}
