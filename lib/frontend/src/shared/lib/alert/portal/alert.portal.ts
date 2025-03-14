import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { shareReplay } from 'rxjs';
import { AlertComponent } from '@shared/lib/alert/component';
import { AlertSystemService } from '@shared/lib/alert/services';

@Component({
	selector: 'fsd-alert-portal',
	templateUrl: './alert.portal.html',
	styleUrl: './alert.portal.scss',
	imports: [AsyncPipe, AlertComponent],
})
export class AlertPortal {
	private readonly _alertSystemService = inject(AlertSystemService);

	protected readonly alerts$ = this._alertSystemService.alerts$.pipe(shareReplay());
}
