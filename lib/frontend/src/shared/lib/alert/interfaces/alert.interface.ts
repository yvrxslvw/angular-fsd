import { AlertType } from '../enums';

export interface Alert {
	id: number;
	type: AlertType;
	message: string;
}
