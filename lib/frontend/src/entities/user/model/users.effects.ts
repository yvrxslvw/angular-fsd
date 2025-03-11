import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, pipe } from 'rxjs';
import { BackendException } from '@shared/interfaces';
import { usersApiActions } from './users.actions';
import { User } from './users.model';
import { UsersApiService } from '../api';

@Injectable()
export class UsersEffects {
	private readonly _actions$ = inject(Actions);
	private readonly _usersApiService = inject(UsersApiService);

	public readonly createEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(usersApiActions.create),
			exhaustMap(({ login, password }) => this._usersApiService.post({ login, password }).pipe(this._fulfillOne())),
		),
	);

	public readonly getAllEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(usersApiActions.getAll),
			exhaustMap(({ search, offset, limit, order, direction }) =>
				this._usersApiService.getAll({ search, offset, limit, order, direction }).pipe(this._fulfillMany()),
			),
		),
	);

	public readonly getOneEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(usersApiActions.getOne),
			exhaustMap(({ id }) => this._usersApiService.getOne({ id }).pipe(this._fulfillOne())),
		),
	);

	public patchEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(usersApiActions.patch),
			exhaustMap(({ id, login, password }) =>
				this._usersApiService.patch({ id }, { login, password }).pipe(this._fulfillOne()),
			),
		),
	);

	public deleteEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(usersApiActions.delete),
			exhaustMap(({ id }) => this._usersApiService.delete({ id }).pipe(this._fulfillOne())),
		),
	);

	public addRoleEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(usersApiActions.addRole),
			exhaustMap(({ id, roleId }) => this._usersApiService.addRole({ id, roleId }).pipe(this._fulfillOne())),
		),
	);

	public removeRoleEffect$ = createEffect(() =>
		this._actions$.pipe(
			ofType(usersApiActions.removeRole),
			exhaustMap(({ id, roleId }) => this._usersApiService.removeRole({ id, roleId }).pipe(this._fulfillOne())),
		),
	);

	private _fulfillOne = () =>
		pipe(
			map((user: User.Entity) => usersApiActions.fulfillOne({ user })),
			catchError(({ error: { messageUI } }: BackendException) => of(usersApiActions.reject({ error: messageUI }))),
		);

	private _fulfillMany = () =>
		pipe(
			map((users: User.Entity[]) => usersApiActions.fulfillMany({ users })),
			catchError(({ error: { messageUI } }: BackendException) => of(usersApiActions.reject({ error: messageUI }))),
		);
}
