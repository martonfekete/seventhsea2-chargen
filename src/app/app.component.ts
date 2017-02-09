import { Component, OnInit, OnChanges } from '@angular/core';
import { CharGenOptions } from './app-usedata';
import {MdDialog, MdDialogRef} from '@angular/material';

/* interfaces */
import { CharTraits } from './app-usedata';
import { CharSkills } from './app-usedata';
import { CharBackgrounds } from './app-usedata';
import { CharAdvantages } from './app-usedata';
import { CharArcana } from './app-usedata';
import { TheanPeople } from './app-usedata';

declare const _:any

export interface CharPoints {
	backgrounds: number,
	traits: number,
	national: number,
	skills: number,
	advantages: number
}

export interface CharStory {
  title: string,
  beginning: string,
  ending: string,
  reward: string,
  steps: string[],
  completed: boolean
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	//title = 'Seventh Sea 2nd Edition Character Generator';
  title = 'SOLVE ADVANTAGE BENEFITS NEXT moron';

	traits: CharTraits[];
	skills: CharSkills[];
	peopleOptions: TheanPeople[];
	allBackgrounds: CharBackgrounds[];
	backgroundOptions: CharBackgrounds[];
  arcanaOptions: CharArcana[]
	advantageOptions: CharAdvantages[];
	points: CharPoints;
	sorceryTimes: number = 0;

  selectedPeople: TheanPeople;
  selectedBackgrounds: CharBackgrounds[] = [];
  selectedArcana: CharArcana[] = [];
  selectedAdvantages: CharAdvantages[] = [];

  stories: CharStory[] = [];
  currentStory: CharStory;
  showStoryForm: boolean = false;
  showStoryErrors = true;

  dots: any[];
  freeForm: boolean;
  charInfo: any[];
  tabIndex: number = 0;

	constructor(
		private dataService: CharGenOptions,
    public storyDialog: MdDialog
	) {
		this.resetSheet();
    this.dots = [1,1,1,1,1];
	}

	ngOnInit() {
		//
	}

  resetSheet(ignore: boolean = false): void {
    if (!ignore) {
      this.charInfo = [
        {value: '', label: 'Player', name: 'player'},
        {value: '', label: 'Character', name: 'character'},
        {value: '', label: 'Concept', name: 'concept'},
        {value: '', label: 'Religion', name: 'religion'},
        {value: '', label: 'Reputations', name: 'reputations'},
        {value: '', label: 'Wealth', name: 'wealth'}
      ];
      this.points = { traits: 2, national: 1, skills: 10, advantages: 5, backgrounds: 2 };
      this.traits = _.cloneDeep(this.dataService.traits);
      this.skills = _.cloneDeep(this.dataService.skills);
      this.peopleOptions = _.cloneDeep(this.dataService.people);
      this.backgroundOptions = _.cloneDeep(this.dataService.backgrounds);
      this.arcanaOptions = _.cloneDeep(this.dataService.arcana);
      this.allBackgrounds = _.cloneDeep(this.dataService.backgrounds);
      this.advantageOptions = _.cloneDeep(this.dataService.advantages);
      this.selectedPeople = this.peopleOptions[0];
      this._selectFavoredTraits(this.selectedPeople.favor);
      this._updateBackgroundList(this.selectedPeople.code);
      this.selectedBackgrounds = [
        this.backgroundOptions[0],
        this.backgroundOptions[0]
      ];
      this.selectedArcana = [
        this.arcanaOptions[0],
        this.arcanaOptions[0]
      ];
      this._setupBaseSkills();
      this._updateAdvantageList('init');
      this._resetCurrentStory();
      this.freeForm = false;
    } else {
      this.freeForm = true;
    }
  }

  openTab(id: number): void {
    this.tabIndex = id;
  }

  /* POINT LIST */
  setCharValue(type: string, index: number, val: number) {
    var _max = this.freeForm ? 5 : 3;
    var increase: number;
    if (type === 'traits') {
      if (!this.freeForm) {
        _max = this.traits[index].favored ? 4 : 3;
      }
      increase = val - this.traits[index].value;
      if (increase > 0 && val <= _max) {
        if (this.points.traits - increase >= 0) {
          this.traits[index].value = val;
          this.points[type] -= increase;
        } else if (this.points.national - increase >= 0 && this.traits[index].favored) {
          this.traits[index].value = val;
          this.points.national -= increase;
        }
      }
      if (increase < 0 && val >= 2) {
        if (this.points.national === 0 && this.traits[index].favored) {
          this.traits[index].value = val;
          ++this.points.national;
          this.points[type] -= increase + 1;
        } else {
          this.traits[index].value = val;
          this.points[type] -= increase;
        }
      }
      if (this.freeForm) {
        this.traits[index].value = val;
      }
    } else if (type === 'skills') {
      var _min = this.skills[index].base;
      increase = val - (this.skills[index].value + this.skills[index].base);
      if (increase > 0 && val <= _max) {
        if (this.points[type] - increase >= 0) {
          this.skills[index].value = val - _min;
          this.points[type] -= increase;
        }
      }
      if (increase < 0 && val >= _min) {
        this.skills[index].value = val - _min;
        this.points[type] -= increase;
      }
      if (this.freeForm) {
        this.skills[index].value = val;
      }
      this._setupSkillTips();
    }
  }

	/* SORCERIES */
  increaseSorcery(): void {
		if (this.points.advantages - 2 >= 0 || this.freeForm) {
			this.sorceryTimes++ ;
			this.points.advantages -= 2;
		}
  	if (!this.freeForm) {
      this._updateAdvantageList('restrict');
    }
  	this._updateSelectedAdvantages();
	}

	decreaseSorcery(): void {
		var _index = _.findIndex(this.advantageOptions, {name: 'Sorcery'});
		var _received = this.advantageOptions[_index].received;
		if (_received && this.sorceryTimes - 1 >= 2 && (this.points.advantages + 2 <= 5 || this.freeForm)) {
			this.sorceryTimes--;
			this.points.advantages += 2;
		} else if (this.sorceryTimes - 1 >= 0 && (this.points.advantages + 2 <= 5 || this.freeForm)) {
			this.sorceryTimes--;
			this.points.advantages += 2;
		}
    if (!this.freeForm) {
      this._updateAdvantageList('restrict');
    }  		this._updateSelectedAdvantages();
	}

  /* HANDLE CHANGES */
	onPeopleChange(event): void {
		this.selectedPeople = event;
		this._selectFavoredTraits(this.selectedPeople.favor);
		this._updateBackgroundList(this.selectedPeople.code);
	}

	onBackgroundChange(event, index): void {
		this.selectedBackgrounds[index] = event;
		this._setupBaseSkills();
		this._updateAdvantageList('init');
	}

  onArcanaChange(event, index): void {
    this.selectedArcana[index] = event;
  }

	onAdvantageUpdate(event, adv): void {
		if (event) {
			if ((adv.reduced === this.selectedPeople.code) || (adv.reduced === 'gla' && (this.selectedPeople.code === 'ava' || this.selectedPeople.code === 'ini' || this.selectedPeople.code === 'hig'))) {
        this.points.advantages -= adv.cost === 5 ? 3 : adv.cost-1;
      } else {
        this.points.advantages -= adv.cost;
      }
			this._updateSelectedAdvantages(adv, 'add');
		} else {
			this.points.advantages += adv.cost;
			this._updateSelectedAdvantages(adv, 'remove');
		}
		var _index = _.findIndex(this.advantageOptions, {name: adv.name});
		this.advantageOptions[_index].bought = event;
		if (!this.freeForm) {
      this._updateAdvantageList('restrict');
    }
    if (this.freeForm && event) {
      this._updateSelectedAdvantages(adv, 'add');
    }
    if (this.freeForm && !event) {
      this._updateSelectedAdvantages(adv, 'remove');
    }
	}

  randomArcana(): void {
    for (var i = 0; i < 2; i++) {
      var _i = Math.round(Math.random() * 19 + 1);
      this.selectedArcana[i] = this.arcanaOptions[_i];
    }
  }

	private _selectFavoredTraits(favs: any): void {
		_.each(this.traits, (trait: CharTraits) => {
  			if (trait.code === favs[0] || trait.code === favs[1]) {
  				trait.favored = true;
  			} else {
  				trait.favored = false;
  			}
		});
	}

	private _setupBaseSkills(): void {
		_.each(this.skills, (skill: CharSkills) => {
			skill.base = 0;
		});
		_.each(this.selectedBackgrounds, (bg: CharBackgrounds) => {
			_.each(bg.skills, (bonus: string) => {
				_.each(this.skills, (skill: CharSkills) => {
					if (skill.code === bonus) {
						skill.base ++;
					}
				});
			});
		});
	}

	private _setupSkillTips(): void {
		_.each(this.skills, (skill: CharSkills) => {
			var total = skill.value + skill.base;
			switch (total) {
				case 5:
					skill.tip = "Re-roll a single die; Sets of 15 = 2 Raises; 10s explode";
					break;
				case 4:
					skill.tip = "Re-roll a single die; Sets of 15 = 2 Raises";
					break;
				case 3:
					skill.tip = "Re-roll a single die";
					break;
				default:
					skill.tip = "";
					break;
			}
		});
	}

	private _updateAdvantageList(reason: string = null) {
		if (reason === 'init') {
      this.selectedAdvantages = [];
			_.each(this.advantageOptions, (adv: CharAdvantages) => {
				adv.disabled = false;
				adv.received = false;
				adv.selected = false;
			});
			_.each(this.selectedBackgrounds, (bg: CharBackgrounds) => {
				if (bg.quirk !== '---') {
  				_.each(bg.advantages, (adv: string) => {
					var _index = _.findIndex(this.advantageOptions, {name: adv});
					this.selectedAdvantages.push(this.advantageOptions[_index]);
					this.advantageOptions[_index].received = true;
					if (adv !== 'Sorcery') {
						this.advantageOptions[_index].selected = true;
						this.advantageOptions[_index].disabled = true;
					} else {
						this.sorceryTimes = 2;
					}
  				});
				}
			});
		}
		if (reason === 'restrict') {
			_.each(this.advantageOptions, (adv: CharAdvantages) => {
				if (!adv.bought && adv.cost > this.points.advantages) {
					adv.disabled = true;
				} else if (!adv.received) {
					adv.disabled = false;
				}
			});
		}
	}

	private _updateBackgroundList(code: string): void {
		var _updated = [];
		_.each(this.allBackgrounds, (bg: CharBackgrounds) => {
			if (_.isUndefined(bg.restriction) || code === 'null') {
				_updated.push(bg);
			}
			if (bg.restriction && bg.restriction === code) {
				_updated.push(bg);
			}
			if (bg.restriction && bg.restriction === 'gla' && code === 'ava') {
				_updated.push(bg);
			}
			if (bg.restriction && bg.restriction === 'gla' && code === 'ini') {
				_updated.push(bg);
			}
			if (bg.restriction && bg.restriction === 'gla' && code === 'hig') {
				_updated.push(bg);
			}
		});
		//this.backgroundOptions = _.orderBy(_updated, ['name']);
		this.backgroundOptions = _updated;
	}

	private _updateSelectedAdvantages(adv: CharAdvantages = null, action: string = ''): void {
		if (action === 'add') {
			this.selectedAdvantages.push(adv);
		}
		if (action === 'remove') {
			var _index = _.findIndex(this.selectedAdvantages, {name: adv.name});
			this.selectedAdvantages.splice(_index,1);
		}
		var _sorcIndex;
		if (this.selectedAdvantages.length > 0) {
		_sorcIndex = _.findIndex(this.selectedAdvantages, (item: any) => {
				return item.name.split('(')[0] === 'Sorcery ';
			});
		} else {
			_sorcIndex = -1;
		}
		if (this.sorceryTimes > 0) {
  		if (_sorcIndex === -1) {
  			this.selectedAdvantages.push({
  				name: 'Sorcery (' + this._getSorceryType() + ') (Rank ' + this.sorceryTimes + ')',
  				cost: 2
  			});
  		} else {
  			this.selectedAdvantages[_sorcIndex] = {
  				name: 'Sorcery (' + this._getSorceryType() + ') (Rank ' + this.sorceryTimes + ')',
  				cost: 2
  			};
  		}
		} else if (this.sorceryTimes === 0 && _sorcIndex > -1) {
			this.selectedAdvantages.splice(_sorcIndex, 1);
		}
	}

	private _getSorceryType(): string {
		var _type = 'Knights of Avalon';
		if (this.selectedPeople.code !== 'null') {
			switch (this.selectedPeople.code) {
				case "eis":
					_type = 'Hexenwerk';
					break;
				case "mon":
					_type = 'Porté';
					break;
				case "uss":
					_type = 'Mother\'s Touch';
					break;
				case "sar":
					_type = 'Sanderis';
					break;
			case "vod":
					_type = 'Sorte';
					break;
				default:
					 _type = 'Glamour';
					break;
			}
		}
		return _type;
	}

  /* STORIES */
  openStory(): void {
    this.showStoryForm = true;
  }

  addStep(): void {
    this.currentStory.steps.push('');
  }

  removeStep(index: number): void {
    this.currentStory.steps.splice(index,1);
  }

  addStory(): void {
    if (this._isValidStory(this.currentStory)) {
      this.stories.push(this.currentStory);
      this.cancelStory();
    } else {
      this.showStoryErrors = true;
    }
  }

  cancelStory(): void {
    this._resetCurrentStory();
    this.showStoryForm = false;
  }

  private _isValidStory(doc: any): boolean {
    var valid: boolean = true;
    _.each(doc, (value: any, key: any) => {
      if (value === '') {
        valid = false;
        return false;
      }
    });
    return valid;
  }

  private _resetCurrentStory(): void {
    this.showStoryErrors = false;
    this.currentStory = {
      title: '',
      beginning: '',
      ending: '',
      reward: '',
      steps: [''],
      completed: false
    };
  }

  generateSheet(): void {
    console.log('generate');
  }
}
