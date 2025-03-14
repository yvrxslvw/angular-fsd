import { Component, inject, Injector, input, Type } from '@angular/core';
import { DialogService } from '@shared/lib';

@Component({
	selector: 'fsd-login-feature',
	templateUrl: './login.feature.html',
	styleUrl: './login.feature.scss',
})
export class LoginFeature {
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);

	public readonly dialog$$ = input.required<Type<{}>>({ alias: 'dialog' });

	protected handleClick() {
		this._dialogService.open('Авторизация', this.dialog$$(), {}, this._injector);
	}
}
