import { Injectable, Inject } from '@angular/core';

export interface CharTraits {
	label: string,
	name: string,
	value: number
}

export interface TheanPeople {
	name: string,
	favor: string[],
	names?: any
}

@Injectable()
export class CharGenOptions {
	people: TheanPeople[];
	traits: CharTraits[];
	skills: any;
	attributes: any;


	constructor() {
		this.people = [
			{ name: 'Avalon', favor: ['res', 'pan']},
			{ name: 'Inish', favor: ['wit', 'pan']},
			{ name: 'Highlander', favor: ['bra', 'fin']},
			{ name: 'Castillian', favor: ['fin', 'wit']},
			{ name: 'Eisen', favor: ['bra', 'res']},
			{ name: 'Montaigne', favor: ['fin', 'pan']},
			{ name: 'Sarmatian', favor: ['bra', 'pan']},
			{ name: 'Ussur', favor: ['res', 'wit']},
			{ name: 'Vesten', favor: ['bra', 'wit']},
			{ name: 'Vodacce', favor: ['fin', 'res']}
		];

		this.traits = [
			{ name: 'bra', label: 'Brawn', value: 2 },
			{ name: 'fin', label: 'Finesse', value: 2 },
			{ name: 'res', label: 'Resolve', value: 2 },
			{ name: 'wit', label: 'Wits', value: 2 },
			{ name: 'pan', label: 'Panache', value: 2 }
		];
	}
}