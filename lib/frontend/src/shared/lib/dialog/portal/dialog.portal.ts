import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, HostBinding, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogComponent } from '../component';
import { DialogSystemService } from '../services';

@Component({
	selector: 'fsd-dialog-portal',
	templateUrl: './dialog.portal.html',
	styleUrl: './dialog.portal.scss',
	imports: [AsyncPipe, DialogComponent],
})
export class DialogPortal {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _dialogSystemService = inject(DialogSystemService);

	@HostBinding('class.no-dialogs') private _isNoDialogs = true;

	protected readonly dialogs$$ = this._dialogSystemService.dialogs$;

	constructor() {
		this._destroyRef.onDestroy(() => {
			this.dialogs$$.complete();
		});

		this.dialogs$$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((dialogs) => {
			this._isNoDialogs = !dialogs.length;
		});
	}
}
