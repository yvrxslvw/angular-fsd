import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatestWith, fromEvent, map, tap } from 'rxjs';
import { UserEntity, UsersApiService, UsersStore } from '@entities/user';
import { SortDirection } from '@shared/enums';

const USERS_LIMIT = 20;

@Component({
	selector: 'fsd-users-list-widget',
	templateUrl: './users-list.widget.html',
	styleUrl: './users-list.widget.scss',
	providers: [UsersStore, UsersApiService],
	imports: [AsyncPipe, UserEntity],
})
export class UsersListWidget {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _usersStore = inject(UsersStore);
	private readonly _document = inject(DOCUMENT);

	private readonly _offset$ = new BehaviorSubject(0);
	private readonly _isEndOfData$ = new BehaviorSubject(false);
	//private readonly _error$ = this._usersStore.error$; // TODO: alert error

	protected readonly isLoading$ = new BehaviorSubject(false);
	protected readonly users$ = this._usersStore.users$.pipe(map((users) => Object.values(users).reverse()));

	constructor() {
		this._destroyRef.onDestroy(() => {
			this._offset$.complete();
			this._isEndOfData$.complete();
			this.isLoading$.complete();
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
		fromEvent(this._document, 'scroll')
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((event) => {
				const element = (event.target as Document).documentElement;
				const percent = Math.round((element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100);
				if (percent < 90 || this.isLoading$.value || this._isEndOfData$.value) return;
				this._offset$.next(this._offset$.value + USERS_LIMIT);
			});
	}
}
