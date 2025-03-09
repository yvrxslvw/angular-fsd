import { Provider } from '@angular/core';
import { environment } from '@shared/environments';
import { API_URL } from '@shared/tokens';

export const provideApiUrl = (): Provider => ({
	provide: API_URL,
	useValue: environment.apiUrl,
});
