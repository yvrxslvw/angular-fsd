import { Component, input } from '@angular/core';
import { User } from '../model';

@Component({
	selector: 'fsd-user-entity',
	templateUrl: './user.entity.html',
	styleUrl: './user.entity.scss',
})
export class UserEntity {
	public user$$ = input.required<User.Entity>({ alias: 'user' });
}
