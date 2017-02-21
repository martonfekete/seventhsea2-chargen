import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CharGenOptions } from '../app-usedata';

declare const _:any

@Component({
	selector: 'app-sorcery-part',
	templateUrl: './sorcery-part.component.html',
	styleUrls: ['./sorcery-part.component.css']
})
export class SorceryPartComponent implements OnInit {
	@Input() nation: string;
	@Input() rank: number;
	@Output() rankChanged = new EventEmitter();
	@Output() updated = new EventEmitter();
	recieved: boolean;
	sorcery: any = {};
	selectedGifts: any = {};
	allowed: boolean = true;
	selectedPatron: any;
	advPoints: number;
	freeForm: boolean;

	constructor(
		private dataService: CharGenOptions
	) {
		this.selectedGifts = {
			major: [],
			minor: []
		};
	}

	ngOnInit() {
		this.setupSorcery();
		this.advPoints = this.dataService.advPoints;
		this.freeForm = this.dataService.freeForm;
		this.recieved = _.cloneDeep(this.rank) === 2;
	}

	setupSorcery(): void {
		var _type = 'Knights of Avalon';
		var _todo = 'Select a Knight and choose your Glamours.';
		var _desc = '';
		var _code = 'gla';
		var _points: any;
		switch (this.nation) {
			case "eis":
				_type = 'Hexenwerk';
				_todo = 'Select your Major and Minor Unguents. You can select ' + this.rank*2 + ' more Minor and ' + this.rank + ' more Major Unguents.';
				_code = 'hex';
				_points = { minor: this.rank*2, major: this.rank };
				break;
			case "mon":
				_type = 'Porté';
				_todo = 'Noting more to set up, you\'re good to go.';
				_desc = 'You can maintain ' + this.rank + ' Major Marks and ' + this.rank*2  + ' Minor Marks. You can use Pull on both Minor and Major Marks, but you can use Walk towards Major Marks. You also have an additional Major Mark on all your alive, one-step relatives above the ones you leave on purpose.';
				_code = 'por';
				break;
			case "uss":
				_type = 'Mother\'s Touch';
				_todo = 'Select your Gifts and Restrictions. You can select ' + this.rank*2 + ' more Gifts and have to choose ' + this.rank + ' more Restrictions.';
				_code = 'mot';
				_points = { minor: this.rank *2, major: this.rank };
				break;
			case "sar":
				_type = 'Sanderis';
				_todo = 'Select a dievas and choose your Deals. You can select ' + this.rank*2 + ' more Minor Favors.';
				_code = 'san';
				_points = { minor: this.rank*2 };
				break;
			case "vod":
				_type = 'Sorte';
				_todo = 'Select your Weaves. You can select ' + this.rank*2 + 'more Minor and ' + this.rank + ' more Major Weaves.';
				_code = 'sor';
				_points = { minor: this.rank*2, major: this.rank };
				break;
			default:
				_type = 'Knights of Avalon';
				_todo = 'Select a Knight and choose your Glamours. Your Glamours each have Ranks. You can distribute ' + this.rank*2 + ' more points among the Minor and ' + this.rank + ' more points among the Major Glamours connected to your Knight.';
				_code = 'gla';
				_points = { minor: this.rank*2, major: this.rank };
				break;
		}
		this.sorcery = {
			name: _type,
			todo: _todo,
			extra: _desc,
			code: _code,
			points: _points
		};
		this.setupOptions(_code);
		this.setupTodo(_code);
	}

	setupOptions(code: string): void {
		var options: any = {};
		if (code !== 'por') {
			options = _.find(this.dataService.sorceries, {type: code});
		}
		this.sorcery.options = options;
		_.each(this.sorcery.options.major, (gift: any) => {
			if (!gift.disabled) {
				gift.disabled = false;
			}
		});
		_.each(this.sorcery.options.minor, (gift: any) => {
			if (!gift.disabled) {
				gift.disabled = false;
			}
		});
	}

	setupTodo(code:string) {
		var _todo: string;
		var _descA: string;
		var _descB: string;
		if (this.sorcery.points.minor === 0 && this.sorcery.points.major === 0) {
			_todo = 'Noting more to set up, you\'re good to go.';
			_descA = '';
			_descB = '';
		} else {
			switch (code) {
				case "hex":
					_todo = 'Select your Major and Minor Unguents.';
					_descA = 'Select ' + this.sorcery.points.minor + ' more Minor Unguents.';
					_descB = 'Select ' + this.sorcery.points.major + ' more Major Unguents.';
					break;
				case "por":
					break;
				case "mot":
					_todo = 'Select your Gifts and Restrictions.';
					_descA = 'Select ' + this.sorcery.points.minor + ' more Gifts.';
					_descB = 'Choose ' + this.sorcery.points.major + ' more Restrictions.';
					break;
				case "san":
					_todo = 'Select a dievas and choose your Deals.';
					_descA = 'Select ' + this.sorcery.points.minor + ' more Minor Favors.';
					break;
				case "sor":
					_todo = 'Select your Weaves.';
					_descA = 'Select ' + this.sorcery.points.minor + ' more Minor Weaves.';
					_descB = 'Select ' + this.sorcery.points.major + ' more Major Weaves.';
					break;
				default:
					_todo = 'Select a Knight and choose your Glamours. Your Glamours each have Ranks.';
					_descA = 'Distribute ' + this.sorcery.points.minor + ' more points among Minor Glamours.';
					_descB = 'Distribute ' + this.sorcery.points.major + ' more points among Major Glamours.';
					break;
			}
		}
		this.sorcery.todo = _todo;
		this.sorcery.descA = _descA;
		this.sorcery.descB = _descB;
		this._emitUpdated(this.sorcery);
	}

	updateSorcery(event, type: string, gift: any): void {
		if (event) {
			this.selectedGifts[type].push(gift);
		} else {
			var _index = _.findIndex(this.selectedGifts[type], {name: gift.name});
			this.selectedGifts[type].splice(_index,1);
		}
		this.calcGiftPoints(type);
	}

	onPatronChange(event): void {
		this.selectedPatron = event;
		this._resetGifts();
		var _major;
		var _minor;
		if (this.sorcery.code === 'gla') {
			var _major = this.selectedPatron.major;
			var _minor = this.selectedPatron.minor;
		} else if (this.sorcery.code === 'san') {
			var _major = this.selectedPatron.name;
			var _minor = _major;
		}
		_.each(this.sorcery.options.major, (gift: any) => {
			if (gift.type !== _major) {
				gift.disabled = true;
				gift.unavailable = true;
			}
		});
		_.each(this.sorcery.options.minor, (gift: any) => {
			if (gift.type !== _minor) {
				gift.disabled = true;
				gift.unavailable = true;
			}
		});
	}

  	increaseSorcery(): void {
		if (this.advPoints - 2 >= 0 || this.freeForm) {
			this.rank++ ;
			this.advPoints -= 2;
		}
		this.calcGiftPoints('major');
		this.calcGiftPoints('minor');
	}

	decreaseSorcery(): void {
		if (this.recieved && this.rank - 1 >= 2 && (this.advPoints + 2 <= 5 || this.freeForm)) {
			this.rank--;
			this.advPoints += 2;
		} else if (this.rank - 1 >= 0 && (this.advPoints + 2 <= 5 || this.freeForm)) {
			this.rank--;
			this.advPoints += 2;
		}
		this.rankChanged.emit(this.advPoints);
		//this.sorcery.points.minor--;
		//this.sorcery.points.minor -= 2;
		this.calcGiftPoints('major');
		this.calcGiftPoints('minor');
	}

	increaseGift(type: string, gift: any): void {
		if (this.sorcery.points[type] - 1 >= 0) {
			gift.rank++;
		}
		this.calcGiftPoints(type);
	}

	decreaseGift(type: string, gift: any): void {
		gift.rank--;
		this.calcGiftPoints(type);
	}

	calcGiftPoints(type: string): void {
		this.sorcery.points[type] = type === 'major' ? this.rank : this.rank*2;
		_.each(this.sorcery.options[type], (gift: any) => {
			if (gift.selected) {
				this.sorcery.points[type] --;
			}
			if (this.sorcery.code === 'gla') {
				if (gift.rank > 0) {
					this.sorcery.points[type] -= gift.rank;
				}
			}
		});
		this._restrictGifts(type);
		this.setupTodo(this.sorcery.code);
	}

	private _resetGifts(): void {
		_.each(this.sorcery.options.major, (gift: any) => {
				gift.disabled = false;
				gift.selected = false;
				gift.unavailable = false;
				if (gift.rank && gift.rank > 0) {
					gift.rank = 0;
				}
		});
		_.each(this.sorcery.options.minor, (gift: any) => {
			if (gift.name !== 'Read') {
				gift.disabled = false;
				gift.selected = false;
				gift.unavailable = false;
				if (gift.rank && gift.rank > 0) {
					gift.rank = 0;
				}
			}
		});
		this._emitUpdated(this.sorcery);
	}

	private _emitUpdated(data: any): void {
		var _emitted: any = {
			name: data.name,
			major: [],
			minor: []
		};
		if (data.code !== 'gla') {
			_.each(this.selectedGifts.major, (gift: any) => {
				_emitted.major.push({name: gift.name, desc: gift.desc});
			});
			_.each(this.selectedGifts.minor, (gift: any) => {
				_emitted.minor.push({name: gift.name, desc: gift.desc});
			});
			if (data.code === 'san') {
				_emitted.patron = _.isUndefined(this.selectedPatron) ? '' : this.selectedPatron.name;
			}
		} else {
			_emitted.patron = _.isUndefined(this.selectedPatron) ? '' : this.selectedPatron.name;
			_.each(data.options.major, (gift: any) => {
				if (gift.rank > 0) {
					_emitted.major.push({name: gift.name + ' (' + gift.rank + ')', desc: gift.desc});
				}
			});
			_.each(data.options.minor, (gift: any) => {
				if (gift.rank > 0) {
					_emitted.minor.push({name: gift.name + ' (' + gift.rank + ')', desc: gift.desc});
				}
			});
		}
		this.updated.emit(_emitted);
	}

	private _restrictGifts(type: string): void {
		if (this.sorcery.points[type] === 0) {
			_.each(this.sorcery.options[type], (gift: any) => {
				if (!gift.selected) {
					gift.disabled = true;
				}
			});
		} else {
			_.each(this.sorcery.options[type], (gift: any) => {
				gift.disabled = false;
			});
		}
	}
}
