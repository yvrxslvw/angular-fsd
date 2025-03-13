import { AsyncPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, inject, Injector, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatestWith, map, tap } from 'rxjs';
import { accountSlice } from '@entities/account';
import { User, UserEntity, UsersApiService, UsersStore } from '@entities/user';
import { DeleteUserFeature, EditUserFeature } from '@features/user';
import { SortDirection } from '@shared/enums';
import { DialogService } from '@shared/lib';
import { ScrollService } from '@shared/services';
import { isAdmin } from '@shared/utils';
import { CreateUserDialog } from '../create-user-dialog';
import { DeleteUserDialog } from '../delete-user-dialog';
import { EditUserDialog } from '../edit-user-dialog';
import { UserInfoDialog } from '../user-info-dialog';

const USERS_LIMIT = 20;

@Component({
	selector: 'fsd-users-list-widget',
	templateUrl: './users-list.widget.html',
	styleUrl: './users-list.widget.scss',
	providers: [UsersStore, UsersApiService],
	imports: [AsyncPipe, UserEntity, EditUserFeature, DeleteUserFeature, NgIf],
})
export class UsersListWidget {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _store = inject(Store);
	private readonly _usersStore = inject(UsersStore);
	private readonly _dialogService = inject(DialogService);
	private readonly _injector = inject(Injector);
	private readonly _scrollService$ = inject(ScrollService);

	private readonly _offset$ = new BehaviorSubject(0);
	private readonly _isEndOfData$ = new BehaviorSubject(false);
	//private readonly _error$ = this._usersStore.error$; // TODO: alert error

	protected readonly isLoading$ = new BehaviorSubject(false);
	protected readonly isAdmin$ = new BehaviorSubject(false);
	protected readonly users$ = this._usersStore.users$.pipe(map((users) => Object.values(users).reverse()));

	protected readonly CreateUserDialog: Type<{}> = CreateUserDialog;
	protected readonly DeleteUserDialog: Type<{}> = DeleteUserDialog;
	protected readonly EditUserDialog: Type<{}> = EditUserDialog;

	constructor() {
		this._destroyRef.onDestroy(() => {
			this._offset$.complete();
			this._isEndOfData$.complete();
			this.isLoading$.complete();
			this.isAdmin$.complete();
		});

		// Getting user admin role
		this._store
			.select(accountSlice.selectAccount)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((account) => {
				this.isAdmin$.next(isAdmin(account));
			});

		// Getting data by changing offset
		this._offset$
			.pipe(
				takeUntilDestroyed(this._destroyRef),
				tap((offset) => this._usersStore.getAll({ offset, limit: USERS_LIMIT, direction: SortDirection.DESC })),
			)
			.subscribe();

		// Setting isLoading and isEndOfData states
		this._usersStore.isLoading$
			.pipe(takeUntilDestroyed(this._destroyRef), combineLatestWith(this._usersStore.isEndOfData$))
			.subscribe(([isLoading, isEnd]) => {
				this.isLoading$.next(isLoading);
				this._isEndOfData$.next(isEnd);
			});

		// Changing offset by scrolling
		this._scrollService$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((scroll) => {
			if (scroll < 90 || this.isLoading$.value || this._isEndOfData$.value) return;
			this._offset$.next(this._offset$.value + USERS_LIMIT);
		});
	}

	protected handleClickUser(user: User.Entity) {
		this._dialogService.open(`Информация о пользователе ${user.login}`, UserInfoDialog, { user }, this._injector);
	}
}
