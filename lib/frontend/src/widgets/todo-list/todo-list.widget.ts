import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { cartApiActions } from '@entities/cart';
import { selectTodos, Todo, todoApiActions, TodoEntity } from '@entities/todo';
import { TodoDeleteFeature, TodoToggleCompletedFeature } from '@features/todo';

@Component({
	selector: 'fsd-todo-list-widget',
	imports: [AsyncPipe, TodoEntity, TodoToggleCompletedFeature, TodoDeleteFeature],
	templateUrl: './todo-list.widget.html',
	styleUrl: './todo-list.widget.scss',
})
export class TodoListWidget {
	readonly #destroyRef = inject(DestroyRef);
	readonly #store = inject(Store);

	protected readonly todos$ = new BehaviorSubject<Todo.Entity[]>([]);
	protected readonly isLoading$ = new BehaviorSubject(false);
	protected readonly error$ = new BehaviorSubject<string | null>(null);

	constructor() {
		this.#destroyRef.onDestroy(() => {
			this.todos$.complete();
			this.isLoading$.complete();
			this.error$.complete();
		});

		this.#store.dispatch(todoApiActions.getAll());
		this.#store.dispatch(cartApiActions.get({ ogo: 'hi' }));

		this.#store
			.select(selectTodos)
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe((state) => {
				this.todos$.next(state.todos);
				this.isLoading$.next(state.isLoading);
				this.error$.next(state.error);
			});
	}
}
