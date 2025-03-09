/* eslint @typescript-eslint/no-explicit-any: off */

import { Injector, Type } from '@angular/core';
import { Subject } from 'rxjs';

export interface Dialog {
	id: number;
	title: string;
	component: Type<{}>;
	closeDialog$: Subject<any>;
	data: any;
	injector?: Injector;
}
