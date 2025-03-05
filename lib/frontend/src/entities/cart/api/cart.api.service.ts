import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@shared/tokens';
import { Cart } from '../model';

@Injectable({
	providedIn: 'root',
})
export class CartApiService {
	readonly #httpClient = inject(HttpClient);
	readonly #apiUrl = inject(API_URL) + '/cart';

	public get(params?: Cart.Api.Get.Params) {
		return this.#httpClient.get<Cart.Api.Get.Response>(`${this.#apiUrl}`, { params: { ...params } });
	}

	public patch(body: Cart.Api.Patch.Body, params?: Cart.Api.Patch.Params) {
		return this.#httpClient.patch<Cart.Api.Patch.Response>(`${this.#apiUrl}`, body, { params: { ...params } });
	}

	public putPromoCode(body: Cart.Api.PutPromoCode.Body, params?: Cart.Api.PutPromoCode.Params) {
		return this.#httpClient.put<Cart.Api.PutPromoCode.Response>(`${this.#apiUrl}`, body, { params: { ...params } });
	}
}
