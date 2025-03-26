import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DEFAULT_API_STATE } from '@shared/constants';
import { BackendException } from '@shared/interfaces';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { RolesApiService } from '../api';
import { Role } from './role.model';

@Injectable()
export class RolesStore extends ComponentStore<Role.State> {
	private readonly _rolesApiService = inject(RolesApiService);

	public readonly roles$ = this.select((state) => state.roles);

	public readonly post = this.effect((request$: Observable<Role.Api.Post.Body>) =>
		request$.pipe(
			tap(() => this._setIsLoading('post', true)),
			switchMap((body) =>
				this._rolesApiService.post(body).pipe(
					tap(() => this._setIsLoading('post', false)),
					map((role) => this._setRole(role)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('post', messageUI)),
				),
			),
		),
	);

	public readonly getAll = this.effect((request$: Observable<Role.Api.GetAll.Params>) =>
		request$.pipe(
			tap(() => this._setIsLoading('getAll', true)),
			switchMap((params) =>
				this._rolesApiService.getAll(params).pipe(
					tap(() => this._setIsLoading('getAll', false)),
					tap((roles) => this._setIsEndOfData('getAll', !roles.length)),
					map((roles) => this._setRoles(roles)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('getAll', messageUI)),
				),
			),
		),
	);

	public readonly getOne = this.effect((request$: Observable<Role.Api.GetOne.Path>) =>
		request$.pipe(
			tap(() => this._setIsLoading('getOne', true)),
			switchMap((path) =>
				this._rolesApiService.getOne(path).pipe(
					tap(() => this._setIsLoading('getOne', false)),
					map((role) => this._setRole(role)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('getOne', messageUI)),
				),
			),
		),
	);

	public readonly patch = this.effect((request$: Observable<Role.Api.Patch.Path & Role.Api.Patch.Body>) =>
		request$.pipe(
			tap(() => this._setIsLoading('patch', true)),
			switchMap(({ id, tag, name }) =>
				this._rolesApiService.patch({ id }, { tag, name }).pipe(
					tap(() => this._setIsLoading('patch', false)),
					map((role) => this._setRole(role)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('patch', messageUI)),
				),
			),
		),
	);

	public readonly delete = this.effect((request$: Observable<Role.Api.Delete.Path>) =>
		request$.pipe(
			tap(() => this._setIsLoading('delete', true)),
			switchMap((path) =>
				this._rolesApiService.delete(path).pipe(
					tap(() => this._setIsLoading('delete', false)),
					map((role) => this._deleteRole(role)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('delete', messageUI)),
				),
			),
		),
	);

	constructor() {
		super({
			roles: {},
			api: {
				post: DEFAULT_API_STATE,
				getAll: DEFAULT_API_STATE,
				getOne: DEFAULT_API_STATE,
				patch: DEFAULT_API_STATE,
				delete: DEFAULT_API_STATE,
			},
		});
	}

	public getApiState$(key: Role.Api.Method) {
		return this.select((state) => state.api[key]);
	}

	private readonly _setRoles = (roles: Role.Entity[]) =>
		this.patchState((state) => ({
			...state,
			roles: roles.reduce((acc, role) => ({ ...acc, [role.id]: role }), { ...state.roles }),
		}));

	private readonly _setRole = (role: Role.Entity) =>
		this.patchState((state) => ({
			...state,
			users: { ...state.roles, [role.id]: role },
		}));

	private readonly _deleteRole = (role: Role.Entity) => {
		this.patchState((state) => {
			const roles = { ...state.roles };
			delete roles[role.id];
			return {
				...state,
				roles,
			};
		});
	};

	private readonly _setIsLoading = (key: Role.Api.Method, isLoading: boolean) =>
		this.patchState((state) => ({
			...state,
			api: { ...state.api, [key]: { error: null, isLoading } },
		}));

	private readonly _setError = (key: Role.Api.Method, error: string) => {
		this.patchState((state) => ({
			...state,
			api: { ...state.api, [key]: { error, isLoading: false } },
		}));
		return EMPTY;
	};

	private readonly _setIsEndOfData = (key: Role.Api.Method, isEndOfData: boolean) => {
		this.patchState((state) => ({
			...state,
			api: { ...state.api, [key]: { ...state.api[key], isEndOfData } },
		}));
		return EMPTY;
	};
}
