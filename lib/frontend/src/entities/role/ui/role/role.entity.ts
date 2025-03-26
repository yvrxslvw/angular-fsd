import { Component, input, output } from '@angular/core';
import { Role } from '../../model';

@Component({
	selector: 'fsd-role-entity',
	templateUrl: './role.entity.html',
	styleUrl: './role.entity.scss',
})
export class RoleEntity {
	public readonly role$$ = input.required<Role.Entity>({ alias: 'role' });

	public readonly clickRole$$ = output({ alias: 'clickRole' });
}
