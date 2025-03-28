import { Component, inject, Injector, input, Type } from '@angular/core';
import { Role } from '@entities/role';
import { IconComponent } from '@shared/components';
import { DialogService } from '@shared/lib';

@Component({
	selector: 'fsd-edit-role-feature',
	templateUrl: './edit-role.feature.html',
	styleUrl: './edit-role.feature.scss',
	imports: [IconComponent],
})
export class EditRoleFeature {
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);

	public readonly role$$ = input.required<Role.Entity>({ alias: 'role' });
	public readonly dialog$$ = input.required<Type<{}>>({ alias: 'dialog' });
	public readonly isIcon$$ = input(false, { alias: 'isIcon' });

	protected handleClick() {
		this._dialogService.open('Редактирование роли', this.dialog$$(), { user: this.role$$() }, this._injector);
	}
}
