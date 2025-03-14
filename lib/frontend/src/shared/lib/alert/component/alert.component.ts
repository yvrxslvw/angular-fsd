import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject, input } from '@angular/core';
import { BehaviorSubject, first, interval } from 'rxjs';
import { IconComponent } from '@shared/components';
import { AlertType } from '../enums';
import { Alert } from '../interfaces';
import { AlertSystemService } from '../services';

@Component({
	selector: 'fsd-alert-component',
	templateUrl: './alert.component.html',
	styleUrl: './alert.component.scss',
	imports: [IconComponent, AsyncPipe],
	host: {
		'[style]': "'--color: ' + alertTypeColor + ';'",
		'(click)': 'handleClickAlert()',
	},
})
export class AlertComponent implements AfterViewInit {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _alertSystemService = inject(AlertSystemService);

	public readonly alert$$ = input.required<Alert>({ alias: 'alert' });

	protected readonly isClosing$ = new BehaviorSubject(false);

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

	constructor() {
		this._destroyRef.onDestroy(() => {
			this.isClosing$.complete();
		});
	}

	public ngAfterViewInit() {
		if (this.alert$$().timer > 0)
			interval(this.alert$$().timer)
				.pipe(first())
				.subscribe(() => {
					this._close();
				});
	}

	protected handleClickAlert() {
		this._close();
	}

	private _close() {
		this.isClosing$.next(true);
		interval(400)
			.pipe(first())
			.subscribe(() => {
				this.alert$$().closeAlert$.next();
				this._alertSystemService.close(this.alert$$().id);
			});
	}
}
