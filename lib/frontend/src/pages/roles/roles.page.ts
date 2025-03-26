import { Component } from '@angular/core';
import { RolesListWidget } from '@widgets/roles';

@Component({
	selector: 'fsd-roles-page',
	templateUrl: './roles.page.html',
	styleUrl: './roles.page.scss',
	imports: [RolesListWidget],
})
export class RolesPage {}
