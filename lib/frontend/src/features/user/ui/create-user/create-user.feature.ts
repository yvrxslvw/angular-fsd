import { Component, inject, Injector, input, Type } from '@angular/core';
import { DialogService } from '@shared/lib';

@Component({
	selector: 'fsd-create-user-feature',
	templateUrl: './create-user.feature.html',
	styleUrl: './create-user.feature.scss',
})
export class CreateUserFeature {
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);

	public readonly dialog$$ = input.required<Type<{}>>({ alias: 'dialog' });

	protected handleClick() {
		this._dialogService.open('Создание нового пользователя', this.dialog$$(), {}, this._injector);
	}
}
