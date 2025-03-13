import { Component, input, output } from '@angular/core';
import { User } from '../../model';

@Component({
	selector: 'fsd-user-entity',
	templateUrl: './user.entity.html',
	styleUrl: './user.entity.scss',
})
export class UserEntity {
	public readonly user$$ = input.required<User.Entity>({ alias: 'user' });

	public readonly clickLogin$$ = output({ alias: 'clickLogin' });
}
