import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, Injector, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Role, RoleEntity, RolesApiService, RolesStore } from '@entities/role';
import { CreateRoleFeature, DeleteRoleFeature, EditRoleFeature } from '@features/role';
import { DialogService } from '@shared/lib';
import { CreateRoleDialog } from '../create-role-dialog';
import { DeleteRoleDialog } from '../delete-role-dialog';
import { EditRoleDialog } from '../edit-role-dialog';
import { RoleInfoDialog } from '../role-info-dialog';

const ROLES_LIMIT = 20;

@Component({
	selector: 'fsd-roles-list-widget',
	templateUrl: './roles-list.widget.html',
	styleUrl: './roles-list.widget.scss',
	providers: [RolesStore, RolesApiService],
	imports: [AsyncPipe, RoleEntity, EditRoleFeature, DeleteRoleFeature, CreateRoleFeature],
})
export class RolesListWidget {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _rolesStore = inject(RolesStore);
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);

	private readonly _offset$ = new BehaviorSubject(0);
	private readonly _isEndOfData$ = new BehaviorSubject(false);

	protected readonly EditRoleDialog: Type<{}> = EditRoleDialog;
	protected readonly DeleteRoleDialog: Type<{}> = DeleteRoleDialog;
	protected readonly CreateRoleDialog: Type<{}> = CreateRoleDialog;

	protected readonly isLoading$ = new BehaviorSubject(false);

	protected readonly roles$ = this._rolesStore.roles$.pipe(map((roles) => Object.values(roles)));

	constructor() {
		this._destroyRef.onDestroy(() => {
			this._offset$.complete();
			this._isEndOfData$.complete();
			this.isLoading$.complete();
		});

		// Get roles
		this._offset$
			.pipe(
				takeUntilDestroyed(this._destroyRef),
				tap((offset) => this._rolesStore.getAll({ offset, limit: ROLES_LIMIT })),
			)
			.subscribe();

		// Get isLoading and isEndOfData states
		this._rolesStore
			.getApiState$('getAll')
			.pipe(
				takeUntilDestroyed(this._destroyRef),
				tap(({ isLoading, isEndOfData }) => {
					this.isLoading$.next(isLoading);
					this._isEndOfData$.next(isEndOfData);
				}),
			)
			.subscribe();
	}

	protected handleClickRole(role: Role.Entity) {
		this._dialogService.open(`Информация о роли ${role.name}`, RoleInfoDialog, { role }, this._injector);
	}
}
