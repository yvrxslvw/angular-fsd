import { Component, input } from '@angular/core';
import { Todo } from '@entities/todo';

@Component({
	selector: 'fsd-todo-entity',
	templateUrl: './todo.entity.html',
	styleUrl: './todo.entity.scss',
})
export class TodoEntity {
	public todo$$ = input.required<Todo.Entity>({ alias: 'todo' });
}
