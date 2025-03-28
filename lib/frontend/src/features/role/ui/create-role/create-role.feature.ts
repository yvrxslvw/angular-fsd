import { Component, inject, Injector, input, Type } from '@angular/core';
import { DialogService } from '@shared/lib';

@Component({
	selector: 'fsd-create-role-feature',
	templateUrl: './create-role.feature.html',
	styleUrl: './create-role.feature.scss',
})
export class CreateRoleFeature {
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);

	public readonly dialog$$ = input.required<Type<{}>>({ alias: 'dialog' });

	protected handleClick() {
		this._dialogService.open('Создание новой роли', this.dialog$$(), {}, this._injector);
	}
}
