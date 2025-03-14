import { inject, Injectable } from '@angular/core';
import { shareReplay, Subject } from 'rxjs';
import { AlertType } from '../enums';
import { AlertSystemService } from './alert-system.service';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	private readonly _alertSystemService = inject(AlertSystemService);

	public open(message: string, type: AlertType = AlertType.WARNING, timer: number = 3000) {
		const closeAlert$ = new Subject<void>();
		this._alertSystemService.count++;
		this._alertSystemService.alerts$.next([
			...this._alertSystemService.alerts$.value,
			{
				id: this._alertSystemService.count,
				type,
				message,
				closeAlert$,
				timer,
			},
		]);
		return closeAlert$.pipe(shareReplay());
	}
}
