import { Component } from '@angular/core';
import { TodoListWidget } from '@widgets/todo-list';

@Component({
	selector: 'fsd-todos-page',
	templateUrl: './todos.page.html',
	styleUrl: './todos.page.scss',
	imports: [TodoListWidget],
})
export class TodosPage {}
