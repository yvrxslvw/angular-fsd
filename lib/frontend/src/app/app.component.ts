import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogPortal } from '@shared/lib';

@Component({
	selector: 'fsd-root',
	imports: [RouterOutlet, DialogPortal],
	templateUrl: './app.component.html',
})
export class AppComponent {}
