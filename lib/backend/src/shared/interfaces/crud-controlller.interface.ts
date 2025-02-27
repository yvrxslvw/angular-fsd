export interface ICrudController<Entity, CreateDto, GetAllDto, UpdateDto> {
	create(createDto: CreateDto): Promise<Entity>;
	getAll(getAllDto: GetAllDto): Promise<Entity[]>;
	getOne(id: string): Promise<Entity>;
	update(id: string, updateDto: UpdateDto): Promise<Entity>;
	delete(id: string): Promise<Entity>;
}
