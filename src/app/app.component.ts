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
declare var html2canvas: any;


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
	title = 'Seventh Sea 2nd Edition Character Generator';
  
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

  showCharSheet: boolean = false;
  
  charWealth: number = 0;
  hasShip: boolean = false;
  shipDetails: any[];
  hasItem: boolean = false;
  itemDesc: string;
  hasCompany: boolean = false;
  companyDesc: string;
  skillForWealthList: CharSkills[];
  skillForWealth: CharSkills;


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
        /*{value: '', label: 'Player', name: 'player'},*/
        {value: '', label: 'Character', name: 'character'},
        {value: '', label: 'Concept', name: 'concept'},
        {value: '', label: 'Religion', name: 'religion'},
        {value: '', label: 'Reputations', name: 'reputations', hidden: true}/*,
        {value: '', label: 'Wealth', name: 'wealth'}*/
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
      this.hasShip = false;
      this.hasItem = false;
      this.itemDesc = '';
      this.hasCompany = false;
      this.companyDesc = '';
      this.shipDetails = [
        {value: '', label: 'Name', name: 'ship_name', type: 'text'},
        {value: '', label: 'Class', name: 'ship_class', type: 'select'},
        {value: '', label: 'Origin', name: 'ship_origin', type: 'select'},
        {value: '', label: 'Background', name: 'ship_bg', type: 'select'}
      ];
      this.skillForWealth = undefined;
      this._setupBaseSkills();
      this._updateAdvantageList('init');
      this._resetCurrentStory();
      this.calculateWealth();
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
      this._setupSkillExtra();
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
    }
		this._updateSelectedAdvantages();
	}

  /* HANDLE CHANGES */
	onPeopleChange(event): void {
		this.selectedPeople = event;
		this._selectFavoredTraits(this.selectedPeople.favor);
		this._updateBackgroundList(this.selectedPeople.code);
    this._updateAdvantageList('restrict');
	}

	onBackgroundChange(event, index): void {
		this.selectedBackgrounds[index] = event;
		this._setupBaseSkills();
		this._updateAdvantageList('init');
    this._updateSelectedAdvantages();
	}

  onArcanaChange(event, index): void {
    this.selectedArcana[index] = event;
  }

  onWealthChange(event): void {
    this.skillForWealth = event;
    this.calculateWealth();
  }

	onAdvantageUpdate(event, adv): void {
    var cost: number;
    if ((adv.reduced === this.selectedPeople.code) || (adv.reduced === 'gla' && (this.selectedPeople.code === 'ava' || this.selectedPeople.code === 'ini' || this.selectedPeople.code === 'hig'))) {
      cost = adv.cost === 5 ? 3 : adv.cost -1;
    } else {
      cost = adv.cost;
    }
    /*
    if (adv.name === 'Sorcery' && event) {
      this.increaseSorcery();
    } else if (!event) {
      this.decreaseSorcery();
    }
    */
    if (!this.freeForm && adv.name !== 'Sorcery' && event) {
      this.points.advantages -= cost;
      this._updateSelectedAdvantages(adv, 'add');
    } else if (!this.freeForm && adv.name !== 'Sorcery') {
      this.points.advantages += cost;
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

  randomBackground(): void {
    var sel: number;
    for (var i = 0; i < 2; i++) {
      var _i = Math.round(Math.random() * 19 + 1);
      if (i === 0) {
        sel = _i;
      }
      if (i === 1 && _i === sel) {
        sel = _i+1;
      } else {
        sel = _i;
      }
      this.selectedBackgrounds[i] = this.backgroundOptions[sel];
      this._setupBaseSkills();
      this._setupSkillExtra();
      this._updateAdvantageList('init');
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

	private _setupSkillExtra(): void {
    this.skillForWealthList = [];
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
      if (skill.value + skill.base > 0) {
        this.skillForWealthList.push(skill);
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
      this._restrictSorcery(this.selectedPeople.code);
		}
		if (reason === 'restrict') {
			_.each(this.advantageOptions, (adv: CharAdvantages) => {
        var people = 'null';
        if (!_.isUndefined(adv.reduced) || !_.isUndefined(adv.restriction)) {
          switch (this.selectedPeople.code) {
            case "ava":
              people = 'gla';
              break;
            case "ini":
              people = 'gla';
              break;
            case "hig":
              people = 'gla';
              break;
            default:
              people = this.selectedPeople.code;
              break;
          }
        }
        if (!adv.bought && adv.cost > this.points.advantages) {
          if ((adv.reduced === people) && ((adv.cost === 5 && adv.cost <= this.points.advantages + 2) || (adv.cost < 5 && adv.cost <= this.points.advantages + 1))) {
            adv.disabled = false;
          } else {
            adv.disabled = true;
          }
        } else if (!adv.received) {
          adv.disabled = false;
        }
        if (!_.isUndefined(adv.restriction) && adv.restriction !== people) {
          adv.disabled = true;
        }
			});

      this._restrictSorcery(this.selectedPeople.code);
		}
	}

  private _restrictSorcery(code: string): void {
      var sorcIndex = _.findIndex(this.advantageOptions, {name: 'Sorcery'});
      if (code === 'cas' || code === 'ves') {
        this.advantageOptions[sorcIndex].disabled = true;
      } else {
        this.advantageOptions[sorcIndex].disabled = false;
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

    // sorcery
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
    // reputation
    var repuIndex: number = _.findIndex(this.selectedAdvantages, {name: 'Reputation'});
    if (repuIndex > -1) {
      this.charInfo[3].hidden = false;
    } else {
      this.charInfo[3].hidden = true;
    }

    // ship
    var shipIndex: number = _.findIndex(this.selectedAdvantages, {name: 'Married to the sea'});
    if (shipIndex > -1) {
      this.hasShip = true;
    } else {
      this.hasShip = false;
    }

    // sign. item
    var itemIndex: number = _.findIndex(this.selectedAdvantages, {name: 'Signature item'});
    if (itemIndex > -1) {
      this.hasItem = true;
    } else {
      this.hasItem = false;
    }

    // follower
    var followIndex: number = _.findIndex(this.selectedAdvantages, {name: 'Trusted companion'});
    if (followIndex > -1) {
      this.hasCompany = true;
    } else {
      this.hasCompany = false;
    }

    this.calculateWealth();

    this.selectedAdvantages = _.orderBy(this.selectedAdvantages, ['name']);
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

  calculateWealth(): void {
    this.charWealth = 0;
    var patron = _.findIndex(this.selectedAdvantages, {name: 'Patron'});
    var rich = _.findIndex(this.selectedAdvantages, {name: 'Rich'});
    if (patron > -1) {
      this.charWealth++;
    }
    if (rich > -1) {
      this.charWealth += 3;
    }
    if (!_.isUndefined(this.skillForWealth)) {
      this.charWealth += (this.skillForWealth.base + this.skillForWealth.value);
    }
  }

  generateSheet(): void {
    this.showCharSheet = true;
  }

  generateRandomName(gender: string): void {
    this.charInfo[0].value = this.dataService.getRandomName(gender, this.selectedPeople.code);
  }

  passCharacter(): any {
    return {
      info: this.charInfo,
      nation: this.selectedPeople.name,
      traits: this.traits,
      backgrounds: this.selectedBackgrounds,
      skills: this.skills,
      arcana: this.selectedArcana,
      advantages: this.selectedAdvantages,
      stories: this.stories,
      extras: {
        wealth: this.charWealth,
        ship: this.shipDetails,
        item: this.itemDesc,
        company: this.companyDesc
      }
    };
  }

  printSheet(): any {
    var toPrint = document.getElementById('printThis');
    html2canvas(toPrint, {
    //html2canvas(document.body, {
      onrendered: function(canvas) {
        //document.body.appendChild(canvas);
        
        //convert canvas 2 image
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        //document.body.appendChild(image);
        
        //download created image
        var download = document.createElement('a');
        download.href = image.src;
        /*if (!_.isUndefined(this.charInfo[0].value)) {
          download.download = this.charInfo[0].value +'.png';
        } else {*/
          download.download = 'seventhsea_sheet.png';
        //}
        download.click();
      },
        background: '#fff',
      });
  }

  activate(event: any): void {
    this.showCharSheet = false;
    if (event === 'reset') {
      this.resetSheet();
    }
  }
}
