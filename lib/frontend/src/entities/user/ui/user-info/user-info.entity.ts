import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { User } from '../../model';

@Component({
	selector: 'fsd-user-info-entity',
	templateUrl: './user-info.entity.html',
	styleUrl: './user-info.entity.scss',
	imports: [DatePipe],
})
export class UserInfoEntity {
	public readonly user$$ = input.required<User.Entity>({ alias: 'user' });

	protected get roles() {
		return this.user$$()
			.roles.map((r) => r.name)
			.join(', ');
	}
}
