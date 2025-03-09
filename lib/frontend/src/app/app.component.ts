import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogPortal } from '@shared/portals';

@Component({
	selector: 'fsd-root',
	imports: [RouterOutlet, DialogPortal],
	templateUrl: './app.component.html',
})
export class AppComponent {}
