/* eslint func-style: off */

import { isDevMode } from '@angular/core';

const stringify = (val: IArguments | unknown) => {
	if (!val) return [null];
	if (Array.isArray(val)) {
		return [val];
	} else if (typeof val === 'object') {
		const values = Object.values(val);
		return values.length ? values : [null];
	} else {
		return [val];
	}
};

export function Logger(target: Function) {
	if (!isDevMode()) return;
	for (const method of Object.getOwnPropertyNames(target.prototype)) {
		if (method === 'constructor' || typeof target.prototype[method] !== 'function') continue;
		const originalMethod = target.prototype[method];
		if (originalMethod['loggerIgnore']) continue;
		target.prototype[method] = function () {
			console.group(`${target.name}.${method}()`);
			try {
				console.log(`Args:\n`, ...stringify(arguments));
				const result = originalMethod.apply(this, arguments);
				console.log(`Return:\n`, ...stringify(result));
				console.groupEnd();
				return result;
			} catch (error) {
				console.error(`Error:\n`, error);
				console.groupEnd();
			}
		};
	}
}

export function IgnoreLogger(_target: Object, _name: string, descriptor: PropertyDescriptor) {
	if (!isDevMode()) return;
	descriptor.value['loggerIgnore'] = true;
}
