import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { TodoApiService } from '../api';
import { todosActions, todosApiActions } from './todos.actions';

@Injectable()
export class TodosEffects {
	readonly #actions$ = inject(Actions);
	readonly #todoApiService = inject(TodoApiService);

	public getAllEffect$ = createEffect(() =>
		this.#actions$.pipe(ofType(todosApiActions.getAll.request), this.#getAllExhaustMap()),
	);

	public toggleCompletedEffect$ = createEffect(() =>
		this.#actions$.pipe(
			ofType(todosActions.toggleCompleted),
			exhaustMap(({ id, completed }) => this.#todoApiService.patch({ id }, { completed }).pipe(this.#getAllExhaustMap())),
		),
	);

	public deleteEffect$ = createEffect(() =>
		this.#actions$.pipe(
			ofType(todosActions.delete),
			exhaustMap(({ id }) => this.#todoApiService.delete({ id }).pipe(this.#getAllExhaustMap())),
		),
	);

	#getAllExhaustMap() {
		return exhaustMap(() =>
			this.#todoApiService.getAll().pipe(
				map((todos) => todosApiActions.getAll.fulfill({ todos })),
				catchError((error) => of(todosApiActions.getAll.reject({ error: error.message }))),
			),
		);
	}
}
