import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo, todosActions } from '@entities/todo';

@Component({
	selector: 'fsd-todo-toggle-completed-feature',
	templateUrl: './todo-toggle-completed.feature.html',
	styleUrl: './todo-toggle-completed.feature.scss',
})
export class TodoToggleCompletedFeature {
	readonly #store = inject(Store);

	public todo$$ = input.required<Todo.Entity>({ alias: 'todo' });

	protected handleClick() {
		this.#store.dispatch(todosActions.toggleCompleted({ id: this.todo$$().id, completed: !this.todo$$().completed }));
	}
}
