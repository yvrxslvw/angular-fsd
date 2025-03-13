import { Component, inject, Injector, input, Type } from '@angular/core';
import { User } from '@entities/user';
import { IconComponent } from '@shared/components';
import { DialogService } from '@shared/lib';

@Component({
	selector: 'fsd-edit-user-feature',
	templateUrl: './edit-user.feature.html',
	styleUrl: './edit-user.feature.scss',
	imports: [IconComponent],
})
export class EditUserFeature {
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);

	public readonly user$$ = input.required<User.Entity>({ alias: 'user' });
	public readonly dialog$$ = input.required<Type<{}>>({ alias: 'dialog' });
	public readonly isIcon$$ = input(false, { alias: 'isIcon' });

	protected handleClick() {
		this._dialogService.open('Редактирование пользователя', this.dialog$$(), { user: this.user$$() }, this._injector);
	}
}
