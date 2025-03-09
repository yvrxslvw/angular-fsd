import { inject } from '@angular/core';
import { DIALOG_CONTEXT } from '../tokens';

interface Context<R, D> {
	data: D;
	close: (data: R) => void;
}

export const injectContext = <R = void, D = {}>() => inject<Context<R, D>>(DIALOG_CONTEXT);
