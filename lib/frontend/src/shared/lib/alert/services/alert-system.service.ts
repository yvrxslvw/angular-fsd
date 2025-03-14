import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../interfaces';

@Injectable({
	providedIn: 'root',
})
export class AlertSystemService {
	private readonly _destroyRef = inject(DestroyRef);

	public count = 0;
	public readonly alerts$ = new BehaviorSubject<Alert[]>([]);

	constructor() {
		this._destroyRef.onDestroy(() => {
			this.alerts$.complete();
		});
	}

	public close(id: number) {
		this.alerts$.next(this.alerts$.value.filter((d) => d.id !== id));
	}
}
