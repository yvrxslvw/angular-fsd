import { Component } from '@angular/core';
import { UsersListWidget } from '@widgets/users';

@Component({
	selector: 'fsd-users-page',
	templateUrl: './users.page.html',
	styleUrl: './users.page.scss',
	imports: [UsersListWidget],
})
export class UsersPage {}
