import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '@entities/todo';
import { API_URL } from '@shared/tokens';

@Injectable({
	providedIn: 'root',
})
export class TodoApiService {
	readonly #httpClient = inject(HttpClient);
	readonly #apiUrl = inject(API_URL) + '/todos';

	public getAll() {
		return this.#httpClient.get<Todo.GetAll.Response>(`${this.#apiUrl}`);
	}

	public getOne(path: Todo.GetOne.Path) {
		return this.#httpClient.get<Todo.GetOne.Response>(`${this.#apiUrl}/${path.id}`);
	}

	public post(body: Todo.Post.Body) {
		return this.#httpClient.post<Todo.Post.Response>(`${this.#apiUrl}`, body);
	}

	public patch(path: Todo.Patch.Path, body: Todo.Patch.Body) {
		return this.#httpClient.patch<Todo.Patch.Response>(`${this.#apiUrl}/${path.id}`, body);
	}

	public delete(path: Todo.Delete.Path) {
		return this.#httpClient.delete<Todo.Delete.Response>(`${this.#apiUrl}/${path.id}`);
	}
}
