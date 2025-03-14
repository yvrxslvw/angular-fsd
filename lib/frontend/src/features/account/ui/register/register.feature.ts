import { Component, inject, Injector, input, Type } from '@angular/core';
import { DialogService } from '@shared/lib';

@Component({
	selector: 'fsd-register-feature',
	templateUrl: './register.feature.html',
	styleUrl: './register.feature.scss',
})
export class RegisterFeature {
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);

	public readonly dialog$$ = input.required<Type<{}>>({ alias: 'dialog' });

	protected handleClick() {
		this._dialogService.open('Регистрация', this.dialog$$(), {}, this._injector);
	}
}
