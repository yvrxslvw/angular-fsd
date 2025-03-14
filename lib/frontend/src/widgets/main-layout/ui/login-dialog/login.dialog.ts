import { Component } from '@angular/core';
import { LoginFormFeature } from '@features/account';

@Component({
	selector: 'fsd-login-dialog',
	templateUrl: './login.dialog.html',
	styleUrl: './login.dialog.scss',
	imports: [LoginFormFeature],
})
export class LoginDialog {}
