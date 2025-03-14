import { Component } from '@angular/core';
import { RegisterFormFeature } from '@features/account';

@Component({
	selector: 'fsd-register-dialog',
	templateUrl: './register.dialog.html',
	styleUrl: './register.dialog.scss',
	imports: [RegisterFormFeature],
})
export class RegisterDialog {}
