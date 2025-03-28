import { Component, inject, Injector, input, output, Type } from '@angular/core';
import { Role } from '@entities/role';
import { IconComponent } from '@shared/components';
import { DialogService } from '@shared/lib';

@Component({
	selector: 'fsd-delete-role-feature',
	templateUrl: './delete-role.feature.html',
	styleUrl: './delete-role.feature.scss',
	imports: [IconComponent],
})
export class DeleteRoleFeature {
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);

	public readonly role$$ = input.required<Role.Entity>({ alias: 'role' });
	public readonly dialog$$ = input.required<Type<{}>>({ alias: 'dialog' });
	public readonly isIcon$$ = input(false, { alias: 'isIcon' });

	public readonly delete$$ = output({ alias: 'delete' });

	protected handleClick() {
		this._dialogService
			.open<boolean>('Удаление роли', this.dialog$$(), { user: this.role$$() }, this._injector)
			.subscribe((isDeleted) => {
				if (isDeleted) this.delete$$.emit();
			});
	}
}
