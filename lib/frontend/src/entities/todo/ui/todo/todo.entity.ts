import { Component, input } from '@angular/core';
import { Todo } from '../../model';

@Component({
	selector: 'fsd-todo-entity',
	templateUrl: './todo.entity.html',
	styleUrl: './todo.entity.scss',
})
export class TodoEntity {
	public todo$$ = input.required<Todo.Entity>({ alias: 'todo' });
}
