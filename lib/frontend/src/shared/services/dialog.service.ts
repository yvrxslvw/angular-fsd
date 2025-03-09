import { inject, Injectable, Injector, Type } from '@angular/core';
import { shareReplay, Subject } from 'rxjs';
import { DialogSystemService } from './dialog-system.service';

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	private readonly _injector = inject(Injector);
	private readonly _dialogSystemService = inject(DialogSystemService);

	public open<R = void, D = {}>(title: string, component: Type<{}>, data?: D, injector?: Injector) {
		const closeDialogSubject = new Subject<R | null>();
		this._dialogSystemService.count++;
		this._dialogSystemService.dialogs$.next([
			...this._dialogSystemService.dialogs$.value,
			{
				id: this._dialogSystemService.count,
				title,
				component,
				closeDialog$: closeDialogSubject,
				data,
				injector: injector || this._injector,
			},
		]);
		return closeDialogSubject.pipe(shareReplay());
	}
}
