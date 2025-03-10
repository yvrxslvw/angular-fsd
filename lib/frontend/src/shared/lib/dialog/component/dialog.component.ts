import { AsyncPipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject, Injector, input, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, first, interval } from 'rxjs';
import { IconComponent } from '@shared/components';
import { Dialog } from '../interfaces';
import { DialogSystemService } from '../services';
import { DIALOG_CONTEXT } from '../tokens';

@Component({
	selector: 'fsd-dialog-component',
	templateUrl: './dialog.component.html',
	styleUrl: './dialog.component.scss',
	imports: [IconComponent, NgClass, AsyncPipe],
})
export class DialogComponent implements AfterViewInit {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _injector = inject(Injector);
	private readonly _dialogSystemService = inject(DialogSystemService);

	@ViewChild('container', { read: ViewContainerRef, static: true })
	private readonly _container!: ViewContainerRef;

	public dialog$$ = input.required<Dialog>({ alias: 'dialog' });

	protected readonly isClosing$ = new BehaviorSubject(false);

	private get _dialogInjector() {
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

	constructor() {
		this._destroyRef.onDestroy(() => {
			this.isClosing$.complete();
		});
	}

	public ngAfterViewInit() {
		this._container.clear();
		this._container.createComponent(this.dialog$$().component, { injector: this._dialogInjector });
	}

	protected handleClickClose() {
		this._close(null);
	}

	private _close<D>(value: D) {
		this.isClosing$.next(true);
		this._dialogSystemService.dialogs$.value.find((d) => d.id === this.dialog$$().id)?.closeDialog$.next(value);
		interval(400)
			.pipe(first())
			.subscribe(() => {
				this._dialogSystemService.close(this.dialog$$().id);
			});
	}
}
