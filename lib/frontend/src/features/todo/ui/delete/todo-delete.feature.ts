import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo, todosActions } from '@entities/todo';
import { IconComponent } from '@shared/components';

@Component({
	selector: 'fsd-todo-delete-feature',
	templateUrl: './todo-delete.feature.html',
	styleUrl: './todo-delete.feature.scss',
	imports: [IconComponent],
})
export class TodoDeleteFeature {
	readonly #store = inject(Store);

	public todo$$ = input.required<Todo.Entity>({ alias: 'todo' });

	protected handleClick() {
		this.#store.dispatch(todosActions.delete({ id: this.todo$$().id }));
	}
}
