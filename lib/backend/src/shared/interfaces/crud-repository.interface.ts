export interface ICrudRepository<T> {
	create(...createData: unknown[]): Promise<T>;
	getAll(...getAllData: unknown[]): Promise<T[]>;
	getOneById(id: number): Promise<T | null>;
	update(id: number, ...data: unknown[]): Promise<T>;
	delete(id: number): Promise<T>;
}
