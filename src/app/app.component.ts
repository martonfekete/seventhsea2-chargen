import { Component } from '@angular/core';
import { CharGenOptions } from './app-usedata';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Seventh Sea 2nd Edition Character Generator';
	subtitle = 'yayHarr';
	traits: any = [];
	peopleOptions: any;
	selectedPeople: any;

	constructor(
		private dataService: CharGenOptions
  	) {
		this.traits = dataService.traits;
		this.peopleOptions = dataService.people;
		this.selectedPeople = this.peopleOptions[0];
		/*_.each(dataService.people, (people: any) => {
			console.log(people.name);
		});*/
  	}

  	decreaseTrait(index: number) {
  		this.dataService.traits[index].value --;
  	}

  	increaseTrait(index: number) {
  		this.traits[index].value ++;

  	}
}
