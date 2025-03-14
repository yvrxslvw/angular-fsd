import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertPortal, DialogPortal } from '@shared/lib';

@Component({
	selector: 'fsd-root',
	imports: [RouterOutlet, DialogPortal, AlertPortal],
	templateUrl: './app.component.html',
})
export class AppComponent {}
