export interface ICrudController<Entity, CreateDto, GetAllDto, UpdateDto> {
	create(createDto: CreateDto, ...args: unknown[]): Promise<Entity>;
	getAll(getAllDto: GetAllDto, ...args: unknown[]): Promise<Entity[]>;
	getOne(id: string, ...args: unknown[]): Promise<Entity>;
	update(id: string, updateDto: UpdateDto, ...args: unknown[]): Promise<Entity>;
	delete(id: string, ...args: unknown[]): Promise<Entity>;
}
