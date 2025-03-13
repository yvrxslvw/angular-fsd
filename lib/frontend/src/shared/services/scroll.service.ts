import { Injectable } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ScrollService extends Observable<number> {
	constructor() {
		super((subscriber) => {
			const element = document.getElementById('scrollWidget');
			if (!element) return subscriber.error('#scrollWidget not found');
			const scroll$ = fromEvent(element, 'scroll').pipe(
				map(() => Math.round((element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100)),
			);
			const subscription = scroll$.subscribe(subscriber);
			return () => subscription.unsubscribe();
		});
	}
}
