import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dialog } from '../interfaces';

@Injectable({
	providedIn: 'root',
})
export class DialogSystemService {
	private readonly _destroyRef = inject(DestroyRef);

	public count = 0;
	public readonly dialogs$ = new BehaviorSubject<Dialog[]>([]);

	constructor() {
		this._destroyRef.onDestroy(() => {
			this.dialogs$.complete();
		});
	}

	public close(id: number) {
		this.dialogs$.next(this.dialogs$.value.filter((d) => d.id !== id));
	}
}
