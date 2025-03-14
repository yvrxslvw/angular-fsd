import { Subject } from 'rxjs';
import { AlertType } from '../enums';

export interface Alert {
	id: number;
	type: AlertType;
	message: string;
	closeAlert$: Subject<void>;
	timer: number;
}
