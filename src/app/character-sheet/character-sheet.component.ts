import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare const _:any
declare var html2canvas: any;

@Component({
	selector: 'app-character-sheet',
	templateUrl: './character-sheet.component.html',
	styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {
	@Input() character: any;
	@Output() refresh = new EventEmitter();
	finalData: any;
	dots: any[];
	lines: any[];
	showBar: boolean = true;

	constructor() {
		this.dots = [1,1,1,1,1];
		this.lines = [1,1,1,1];
		this.finalData = {
			info: [],
			arcana: [],
			traits: [],
			backgrounds: [],
			skills: [],
			advantages: [],
			stories: [],
			ship: {},
			misc: {}
		};
		/*setTimeout(() => {
			this.printSheet();
			//console.log(JSON.stringify(this.finalData));
		},1000);*/
	}

	ngOnInit() {
		//console.log(this.character);
		this.transformData(this.character);
		//this.finalData = {"info":[{"name":"Character","value":"Gaspar"},{"name":"Concept","value":"Diego Marad"},{"name":"Nation","value":"Castillian"},{"name":"Religion","value":"Vaticine"},{"name":"Reputations","value":""},{"name":"Wealth","value":5}],"arcana":[{"arc":"The Tower","name":"Arrogant","desc":"You receive a Hero Point when your Hero shows disdain, contempt, or otherwise looks down on a Villain or someone who could cause harm to friends. "},{"arc":"The Beggar","name":"Insightful","desc":"Activate your Virtue to discover a Brute Squad’s type, or to know a Villain’s Rank and Advantages. "}],"traits":[{"name":"Brawn","value":4},{"name":"Finesse","value":3},{"name":"Resolve","value":3},{"name":"Wits","value":4},{"name":"Panache","value":5}],"backgrounds":[{"name":"Assassin ","desc":"Earn a hero point when you go out of your way to avoid the death of an adversary or outright refuse a course of action because it could result in another person’s death. "},{"name":"Duelist ","desc":"Earn a hero point when you resort to the edge of your blade to defend a noble ideal. "}],"skills":[{"name":"Aim","tip":"","value":2},{"name":"Athletics","tip":"Re-roll a single die; Sets of 15 = 2 Raises; 10s explode","value":5},{"name":"Brawl","tip":"Re-roll a single die; Sets of 15 = 2 Raises","value":4},{"name":"Convince","tip":"Re-roll a single die","value":3},{"name":"Empathy","tip":"","value":2},{"name":"Hide","tip":"Re-roll a single die","value":3},{"name":"Intimidate","tip":"","value":2},{"name":"Notice","tip":"","value":1},{"name":"Perform","tip":"","value":1},{"name":"Ride","tip":"","value":0},{"name":"Sailing","tip":"","value":2},{"name":"Scholarship","tip":"","value":2},{"name":"Tempt","tip":"","value":0},{"name":"Theft","tip":"Re-roll a single die","value":3},{"name":"Warfare","tip":"Re-roll a single die; Sets of 15 = 2 Raises","value":4},{"name":"Weaponry","tip":"","value":2}],"advantages":[{"name":"Alchemist","desc":"Spend a Hero Point to produce an elixir or potion that provides an immediate beneft. See details on p. 153 in the 7thSea Core."},{"name":"Duelist academy","desc":"You may choose a Dueling Style."},{"name":"Dynamic approach","desc":"Spend a Hero Point to change your Approach during an Action Sequence or Dramatic Sequence."},{"name":"Fencer","desc":"You gain 1 Bonus Die when you make a Weaponry Risk using a rapier, dagger, cutlass or similar weapon in one hand."},{"name":"Large","desc":"Gain 1 Bonus Die on any Risk that is easier due to your size"},{"name":"Married to the sea","desc":"You have access to a Ship or your Ship gains an additional Background."},{"name":"Psst, over here","desc":"While undetected, you can spend a Hero Point to lure a single character out of position and knock him out."},{"name":"Specialist","desc":"You do not have to pay additional Raises to Improvise with your Specialist Skill."},{"name":"Team player","desc":"When you spend a Raise to create an Opportunity, you can spend a second Raise and activate the Opportunity for another Hero."},{"name":"Trusted companion","desc":"You have a small group of individuals who are devoted to you.  See details on p. 154 in the 7thSea Core."}],"stories":[{"title":"A first story","beginning":"Start playing with Diego","ending":"Get filthy drunk","reward":"Able drinker","steps":["Find the Filthy Wench and get piss drunk"],"completed":false}],"ship":{"ship_name":"Murcillia","ship_class":"galleon","ship_origin":"Castillian","ship_bg":"Icebreaker"},"misc":{"item":"","comp":"A handmaiden"}};
		//console.log(this.finalData);
	}

	transformData(data: any) {
		_.each(data.info, (field: any) => {
			this.finalData.info.push({
				name: field.label, value: field.value
			});
		});
		this.finalData.info.push({
			name: 'Nation', value: data.nation
		});
		this.finalData.info.push({
			name: 'Wealth', value: data.extras.wealth
		});
		/*_.each(data.info, (field: any) => {
			this.finalData.info[field.label] = field.value
		});
		this.finalData.info['Nation'] = data.nation;*/
		this.finalData.info = _.sortBy(this.finalData.info, ['name']);
		_.each(data.traits, (field: any) => {
			this.finalData.traits.push({
				name: field.name, value: field.value
			});
		});
		_.each(data.skills, (field: any) => {
			this.finalData.skills.push({
				name: field.name, tip: field.tip, value: (field.base + field.value)
			});
		});
		/*
		_.each(data.skills, (field: any, index: number) => {
			if (index < (data.skills.length / 2)) {
				this.finalData.skillsA.push({
					name: field.name, tip: field.tip, value: (field.base + field.value)
				});
			}
		});
		_.each(data.skills, (field: any, index: number) => {
			if (index > (data.skills.length / 2)) {
				this.finalData.skillsB.push({
					name: field.name, tip: field.tip, value: (field.base + field.value)
				});
			}
		});
		*/
		_.each(data.backgrounds, (field: any) => {
			this.finalData.backgrounds.push({
				name: field.name, desc: field.quirk
			});
		});
		_.each(data.advantages, (field: any) => {
			this.finalData.advantages.push({
				name: field.name, desc: field.short
			});
		});
		_.each(data.arcana, (field: any, index: number) => {
			if (index > 0) {
				this.finalData.arcana.push({
					arc: field.name, name: field.virtue.name, desc: field.virtue.description
				});
			}
			else {
				this.finalData.arcana.push({
					arc: field.name, name: field.hubris.name, desc: field.hubris.description
				});
			}
		});
		this.finalData.stories = data.stories;
		_.each(data.extras.ship, (field: any) => {
			this.finalData.ship[field.name] = field.value;
		});
		this.finalData.misc.item = data.extras.item;
		this.finalData.misc.comp = data.extras.company;
	}

	save(): void {
		this.showBar = false;
		this.printSheet();
	}

	goBack(): void {
		this.refresh.emit('activate');
	}

	reset(): void {
		this.refresh.emit('reset');
	}

	printSheet(): any {
    //var toPrint = document.getElementById('printThis');
    //html2canvas(toPrint, {
    html2canvas(document.body, {
      onrendered: function(canvas) {
        //document.body.appendChild(canvas);
        
        //convert canvas 2 image
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        //document.body.appendChild(image);
        
        //download created image
        var download = document.createElement('a');
        download.href = image.src;
        download.download = 'seventhsea_sheet.png';
        download.click();
      },
        background: '#fff',
      });
  }
}
