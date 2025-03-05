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
		return this.#httpClient.get<Todo.Api.GetAll.Response>(`${this.#apiUrl}`);
	}

	public getOne(path: Todo.Api.GetOne.Path) {
		return this.#httpClient.get<Todo.Api.GetOne.Response>(`${this.#apiUrl}/${path.id}`);
	}

	public post(body: Todo.Api.Post.Body) {
		return this.#httpClient.post<Todo.Api.Post.Response>(`${this.#apiUrl}`, body);
	}

	public patch(path: Todo.Api.Patch.Path, body: Todo.Api.Patch.Body) {
		return this.#httpClient.patch<Todo.Api.Patch.Response>(`${this.#apiUrl}/${path.id}`, body);
	}

	public delete(path: Todo.Api.Delete.Path) {
		return this.#httpClient.delete<Todo.Api.Delete.Response>(`${this.#apiUrl}/${path.id}`);
	}
}
