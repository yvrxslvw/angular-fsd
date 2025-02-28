export const getStringByEnum = (enumeration: object) =>
	Object.values(enumeration)
		.map((v) => `'${v}'`)
		.join(', ');
