import { Component, input } from '@angular/core';

@Component({
	selector: 'fsd-icon',
	template: '',
	styleUrl: 'icon.component.scss',
	host: {
		'[style]': '"--icon: url(\'/icons/" + icon$$() + ".svg\');"',
	},
})
export class IconComponent {
	public icon$$ = input.required<string>({ alias: 'icon' });
}
