import { Component } from '@angular/core';
import { Alert, AlertType } from '@shared/lib';
import { AlertComponent } from '@shared/lib/alert/component';

@Component({
	selector: 'fsd-alert-portal',
	templateUrl: './alert.portal.html',
	styleUrl: './alert.portal.scss',
	imports: [AlertComponent],
})
export class AlertPortal {
	protected readonly testAlerts: Alert[] = [
		{
			id: 1,
			type: AlertType.ERROR,
			message: 'test',
		},
		{
			id: 2,
			type: AlertType.WARNING,
			message:
				'gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
		},
		{
			id: 3,
			type: AlertType.SUCCESS,
			message:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis cum deserunt dicta ipsum magnam magni molestiae quo saepe vel! At, maiores mollitia nisi perferendis reiciendis sit temporibus ut veniam!',
		},
	];
}
