import { NgComponentOutlet } from '@angular/common';
import { Component, HostBinding, inject, Injector, input } from '@angular/core';
import { first, interval } from 'rxjs';
import { Dialog } from '../../interfaces';
import { DialogSystemService } from '../../services/dialog-system.service';
import { DIALOG_CONTEXT } from '../../tokens';
import { IconComponent } from '../icon';

@Component({
	selector: 'fsd-dialog-component',
	templateUrl: './dialog.component.html',
	styleUrl: './dialog.component.scss',
	host: {
		'(click)': 'handleClose();',
	},
	imports: [IconComponent, NgComponentOutlet],
})
export class DialogComponent {
	private readonly _dialogSystemService = inject(DialogSystemService);
	private readonly _injector = inject(Injector);

	@HostBinding('class.closing') private _isClosing = false;

	public dialog$$ = input.required<Dialog>({ alias: 'dialog' });

	protected get dialogInjector() {
		return Injector.create({
			providers: [
				{
					provide: DIALOG_CONTEXT,
					useValue: {
						data: this.dialog$$().data,
						close: (data?: unknown) => this._close(data),
					},
				},
			],
			parent: this.dialog$$().injector || this._injector,
		});
	}

	protected handleClose() {
		this._close(null);
	}

	private _close<D>(value: D) {
		this._isClosing = true;
		this._dialogSystemService.dialogs$.value.find((d) => d.id === this.dialog$$().id)?.closeDialog$.next(value);
		interval(400)
			.pipe(first())
			.subscribe(() => {
				this._dialogSystemService.close(this.dialog$$().id);
			});
	}
}
