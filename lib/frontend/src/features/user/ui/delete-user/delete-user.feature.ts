import { Component, inject, Injector, input, output, Type } from '@angular/core';
import { User } from '@entities/user';
import { IconComponent } from '@shared/components';
import { DialogService } from '@shared/lib';

@Component({
	selector: 'fsd-delete-user-feature',
	templateUrl: './delete-user.feature.html',
	styleUrl: './delete-user.feature.scss',
	imports: [IconComponent],
})
export class DeleteUserFeature {
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);

	public readonly user$$ = input.required<User.Entity>({ alias: 'user' });
	public readonly dialog$$ = input.required<Type<{}>>({ alias: 'dialog' });
	public readonly isIcon$$ = input(false, { alias: 'isIcon' });

	public readonly delete$$ = output({ alias: 'delete' });

	protected handleClick() {
		this._dialogService
			.open<boolean>('Удаление пользователя', this.dialog$$(), { user: this.user$$() }, this._injector)
			.subscribe((isDeleted) => {
				if (isDeleted) this.delete$$.emit();
			});
	}
}
