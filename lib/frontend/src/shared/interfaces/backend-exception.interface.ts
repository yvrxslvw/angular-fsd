import { HttpErrorResponse } from '@angular/common/http';

export interface BackendException<D = {}> extends HttpErrorResponse {
	error: {
		dateTime: string;
		endpoint: string;
		status: number;
		messageUI: string;
		messageDebug?: string;
		data?: D;
	};
}
