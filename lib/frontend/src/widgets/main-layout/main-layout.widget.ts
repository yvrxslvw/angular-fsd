import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
	selector: 'fsd-main-layout',
	imports: [RouterOutlet, RouterLink],
	templateUrl: './main-layout.widget.html',
	styleUrl: './main-layout.widget.scss',
})
export class MainLayoutWidget {}
