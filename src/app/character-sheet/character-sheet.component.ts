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
		if (data.extras.society) {
			this.finalData.info.push({
				name: 'Secret Society', value: data.extras.society
			});
		}
		if (data.extras.languages) {
			var _lang: string = '';
			var isLing = _.findIndex(data.advantages, {name: 'Linguist'});
			if (isLing === -1) {
				_.each(data.extras.languages, (lang: any, index: number) => {
					_lang += lang.name;
					if (index !== data.extras.languages.length - 1) {
						_lang += ', ';
					}
				});
			} else {
				_lang = 'All of them';
			}
			this.finalData.info.push({
				name: 'Languages', value: _lang
			});
		}
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
				name: field.name, desc: field.short
			});
		});
		_.each(data.advantages, (field: any) => {
			if (field.name !== 'Sorcery') {
				this.finalData.advantages.push({
					name: field.name, desc: field.short
				});
			}
		});
		if (data.extras.duelist) {
			var _duelIndex = _.findIndex(this.finalData.advantages, {name: 'Duelist academy'});
			this.finalData.advantages[_duelIndex].short = 'You are an initiate of the ' + data.extras.duelist + ' Duelist Style';
		}
		
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
			if (field.name === 'ship_bg') {
				if (_.isUndefined(this.finalData.ship[field.name])) {
					this.finalData.ship[field.name] = field.value;	
				} else {
					this.finalData.ship.ship_bg_extra = field.value;
				}
			} else {
				this.finalData.ship[field.name] = field.value;
			}
		});
		this.finalData.misc.item = data.extras.item;
		this.finalData.misc.comp = data.extras.company;
		this.finalData.sorcery = data.sorcery;
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

	print(): void {
		let printContents, popupWin;
	    printContents = document.getElementById('char-sheet').innerHTML;
	    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
	    popupWin.document.open();
	    popupWin.document.write(`
	      <html moznomarginboxes mozdisallowselectionprint>
	        <head>
	          <title>Character Sheet</title>
	            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	          <style media="all">
				body {
					margin: 0;
				}
				#wrapper {
					background-color: rgba(255,255,255,.95);
					position: fixed;
					width: 100%;
					height: 100%;
					z-index: -1;
				}
				app-root {
					padding:8px;
				}
				body, input, md-select {
					font-size:10pt;
				}
				h1 {
					font-size:1.5em;
				}
				h2, .story-card h2 {
					font-size:1.3em;
				}
				h3 {
					font-size:1.15em;
					font-weight: normal;
					padding-left: .5em;
				}
				md-select {
					margin-top:22px;
				}
				.margin-bottom {
					margin-bottom: 1em!important;
				}
				.margin-left {
					margin-left: 1em!important;
				}
				.margin-top {
					margin-top: 1em!important;
				}
				.margin-right {
					margin-right: 1em!important;
				}
				.no-margin {
					margin: 0 !important;
				}
				.padding {
					padding: 1em !important;
				}
				.strong-text {
					font-weight: bold;
				}
				.md-caption .md-list-item {
					height: auto;
				}
				.md-caption p, .skill-caption {
					font-size: smaller;
					color: grey;
				}
				.md-caption p {
					margin-left: 1em;
				}
				.select-wide, md-select {
					width:180px;
				}
				.bg-grey {
					background: rgba(155,155,155,.5);
				}
				.bg-darkgrey {
					background: rgba(20,20,20,.5) !important;
				}
				.text-grey {
					color: grey;
				}
				.bg-shade {
					background: rgba(178, 34, 34,.2);
				}
				md-input-container {
					width: 100%;
					margin-top:1em;
				}

				.char-box {
					width:calc(50% - 1em);
					margin:.4em;
					padding:1em;
					box-sizing: border-box;
				}

				.char-box.small-box {
					min-width: 350px;
					max-width: 400px;
				}

				.char-box h2, md-grid-tile h2 {
					padding:.2em 1em .1em;
					color: white;
					background: firebrick;
					text-transform: uppercase;
					font-weight: normal;
				}
				.inline {
					display: inline-block;
					vertical-align: top;
				}
				.inline-multi {
					float:left;
				}

				md-card-content ol {
					margin-left: 0;
					padding-left: 1em;
				}
				.pointer {
					cursor: pointer;
				}
				.text-red {
					color: firebrick;
				}

				md-grid-tile figure {
					justify-content: flex-start !important;
				}
				.inline-icon input {
					width: 90% !important;
					float: left;
				}
				.inline-icon md-icon {
					font-size:1.25em;
					color: firebrick;
					float: right;
				}
				.linkbutton {
					color: inherit;
				}

				.story-card {
					padding: 0;
				}
				.story-card md-card-title {
					font-size: inherit;
				}
				.story-card md-card-subtitle {
					border-bottom: thin solid firebrick;
					padding: 0 0 .5em 1em;
					margin: 0;
					color: inherit;
				}
				.story-card table {
					width:100%;
					font-size: small;
					text-align: center;
					border-bottom: thin solid firebrick;
				}
				.story-card p {
					margin-left: 1em;
					margin-bottom: 10px;
					width:50px;
					border-bottom: thin dashed firebrick;
				}
				.story-card md-card-content ol {
					font-size: small;
					padding-bottom: 1em;
					margin-left: 1em;
				}
				.story-card md-card-content ol li {
					margin-left: 0;
					padding-left: 5px;
				}
				.text-truncate {
					text-overflow: ellipsis;
				    white-space: nowrap;
				    overflow: hidden;
				}
				.indented h3 {
					font-size: 1em;
					font-weight: bold;
					padding-bottom: 5px;
					margin-bottom: 0;
					border-bottom: thin solid firebrick;
				}
				.indented p {
					padding-left: 1em;
				}
				.align-center {
					text-align: center;
				}
				.inline-number {
					display: inline-block;
					width: 30px;
					margin-top: 5px;
				}
				md-slide-toggle.inline {
					margin: 0 0 0 30px;
				}
				p.inline {
					margin: 4px 30px 0 0;
					vertical-align: middle;
				}
				.rank-list {
					margin-top: 0;
					margin-left:0;
					padding-left:0;
					list-style-type: none;
				}
				.rank-list li {
					padding: 5px 10px; 
				}
				.inline-check {
					position: relative;
					top:20px;
					margin: 0 2em 0 1em; 
				}
				.italic {
					font-style: italic;
				}
				.char-box {
					font-family: sans-serif;
				}
				.char-box.small {
					max-width: calc(100% / 4 - 15px);
				}
				.char-box h2 {
					margin-bottom: 0;
					text-align: center;
					font-size: 1.15em;
				}
				.char-box h4 {
					margin-bottom: 0;
				}
				.rank-name {
					display: inline-block;
					width:75px;
				}
				md-icon:not(.regular) {
					font-size: 16px;
					height: 16px;
					width: 16px;
					position: relative;
					top: 2px;
				}
				.align {
					position: relative;
				    top: -1px;
				}
				.sep {
					width:10px;
				}
				.char-box-block {
					margin-top:10px;
				}

				.char-box-block p:not(.md-caption) {
					padding: 0;
					margin: 0 5px 5px 10px;
				}
				p.md-caption {
					margin: 0;
					padding: 0;
					font-size: smaller;
					color: grey;
					margin-left: 15px;
				}
				.story-card {
					box-shadow: none;
				}
				.story-card md-card-title {
					margin-bottom: 10px;
				}
				.story-card md-card-subtitle, .story-card table td, .story-card ol li {
					font-size: smaller;
				}
				table.wounds-table {
					table-layout: fixed;
					margin: auto;
				}
				table.wounds-table .strong-text {
					position: relative;
					top: 4px;
				}
				td.with-explanation {
					width:115px;
				}
				table.wounds-table .sep {
					font-size: smaller;
					margin-left: 10px;
					font-style: italic;
					color: grey;
				}
				table.wounds-table .sep md-icon {
					top: 4px;
				}
				.dramatic-icon {
					font-size: x-large;
				    top: 5px;
				    color: grey;
				}
				@page {
					size: auto; margin: 0; }
				}
	          </style>
	        </head>
	    <body onload="window.print();window.close()">` + printContents + `</body>
	      </html>`
	    );
	    popupWin.document.close();
	}

	printSheet(): any {
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
