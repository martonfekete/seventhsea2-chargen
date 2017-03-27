import { Component, OnInit, OnChanges } from '@angular/core';
import { CharGenOptions } from './app-usedata';

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
	advantages: number,
  free: number
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
  sorceryToPass: any;

  selectedPeople: TheanPeople;
  selectedBackgrounds: CharBackgrounds[] = [];
  showNationalBgOnly: any;
  selectedArcana: CharArcana[] = [];
  selectedAdvantages: CharAdvantages[] = [];

  stories: CharStory[] = [];
  currentStory: CharStory;
  showStoryForm: boolean = false;
  showStoryErrors = true;

  dots: any[];
  tabIndex: number = 0;
  freeForm: boolean;
  showCharSheet: boolean = false;
  advCostRestriction: number = 5;
  showAllAdv: boolean = false;
  advQuery: string;
  filteredAdvantages: CharAdvantages[];
  duplicateAdv: string[];
  
  charInfo: any[];
  religionOptions: string[];
  selectedReligion: string;
  otherReligion: string;
  languageOptions: any[] = [];
  selectedLanguages: string[];
  hasLinguist: boolean = false;
  charWealth: number = 0;
  skillForWealthList: CharSkills[];
  skillForWealth: CharSkills;
  hasShip: boolean = false;
  shipDetails: any[];
  shipData: any;
  hasItem: boolean = false;
  itemDesc: string;
  hasCompany: boolean = false;
  companyDesc: string;
  isDuelist: boolean = false;
  duelistStyles: any;
  selectedStyle: string;
  secretSocieties: any;
  selectedSociety: string;

	constructor(
		private dataService: CharGenOptions
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
        {value: '', label: 'Character', name: 'character', type: 'text'},
        {value: '', label: 'Concept', name: 'concept', type: 'text'},
        {value: '', label: 'Religion', name: 'religion', type: 'select'},
        {value: '', label: 'Reputations', name: 'reputations', hidden: true, type: 'text'}/*,
        {value: '', label: 'Wealth', name: 'wealth'}*/
      ];
      this.religionOptions = this.dataService.religion;
      this.selectedReligion = '';
      this.otherReligion = '';
      this.points = { traits: 2, national: 1, skills: 10, advantages: 5, backgrounds: 2, free: 0 };
      this.dataService.advPoints = this.points.advantages;
      this.traits = _.cloneDeep(this.dataService.traits);
      this.skills = _.cloneDeep(this.dataService.skills);
      this.peopleOptions = _.cloneDeep(this.dataService.people);
      this.backgroundOptions = _.cloneDeep(this.dataService.backgrounds);
      this.arcanaOptions = _.cloneDeep(this.dataService.arcana);
      this.allBackgrounds = _.cloneDeep(this.dataService.backgrounds);
      this.advantageOptions = _.cloneDeep(this.dataService.advantages);
      this.filteredAdvantages = this.advantageOptions;
      this.advCostRestriction = 5;
      this.advQuery = '';
      this.showAllAdv = true;
      this.duplicateAdv = [];
      this.selectedPeople = this.peopleOptions[0];
      this._restrictSorcery(this.selectedPeople.code);
      this._selectFavoredTraits(this.selectedPeople.favor);
      this._updateBackgroundList(this.selectedPeople.code);
      this.selectedBackgrounds = [
        this.backgroundOptions[0],
        this.backgroundOptions[0]
      ];
      this.showNationalBgOnly = {
        first: false,
        second: false
      }
      this.selectedArcana = [
        this.arcanaOptions[0],
        this.arcanaOptions[0]
      ];
      this.hasLinguist = false;
      this.languageOptions = [];
      _.each(this.dataService.languages, (lang: string) => {
        this.languageOptions.push({name: lang, selected: false, disabled: false});
      });
      this.selectedLanguages = [];
      this.hasShip = false;
      this.hasItem = false;
      this.itemDesc = '';
      this.hasCompany = false;
      this.companyDesc = '';
      this.isDuelist = false;
      this.duelistStyles = this.dataService.duelistStyles;
      this.selectedStyle = '';
      this.secretSocieties = this.dataService.secretSocieties;
      this.selectedSociety = '';
      this.shipDetails = [
        {value: '', label: 'Name', name: 'ship_name', type: 'text'},
        {value: '', label: 'Class', name: 'ship_class', type: 'select'},
        {value: '', label: 'Origin', name: 'ship_origin', type: 'select'},
        {value: '', label: 'Background', name: 'ship_bg', type: 'select'},
        {value: '', label: 'Bonus Background', name: 'ship_bg', type: 'select'}
      ];
      this.shipData = this.dataService.shipDetails;
      this.skillForWealth = undefined;
      this._setupBaseSkills();
      this._updateAdvantageList('init');
      this._resetCurrentStory();
      this.calculateWealth();
      this.sorceryTimes = 0;
      this.freeForm = false;
    } else {
      this.freeForm = true;
    }
    this.tabIndex = 0;
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
      this._setupLanguages(false,this.selectedPeople.name);
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
    this._setupLanguages(false, this.selectedPeople.name);
    this.dataService.shiftPeople(this.selectedPeople.code);
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

    // sorcery
    if (adv.name === 'Sorcery' && event) {
      this.increaseSorcery();
    } else if (!event) {
      this.decreaseSorcery();
    }

    var _index = _.findIndex(this.advantageOptions, {name: adv.name});
    if (!this.freeForm) {
      if (this.points.free === 0) {
        if (adv.name !== 'Sorcery' && event) {
          this.points.advantages -= cost;
          this._updateSelectedAdvantages(adv, 'add');
        } else if (!this.freeForm && adv.name !== 'Sorcery') {
          this.points.advantages += cost;
          this._updateSelectedAdvantages(adv, 'remove');
        }
        this.advantageOptions[_index].bought = event;
      } else if (cost === this.points.free) {
        this.advantageOptions[_index].bonus = true;
        this._updateSelectedAdvantages(adv, 'add');
        this.points.free = 0;
      } else {
        event = false;
      }
    }
    if (!this.freeForm) {
      this._updateAdvantageList('restrict');
    }
    if (this.freeForm && event) {
      this._updateSelectedAdvantages(adv, 'add');
    }
    if (this.freeForm && !event) {
      this._updateSelectedAdvantages(adv, 'remove');
    }
    this.dataService.advPoints = this.points.advantages;
	}

  onLanguageUpdate(event, lang: any): void {
    if (event) {
      this.selectedLanguages.push(lang);
      this._restrictLanguages();
    } else {
      _.remove(this.selectedLanguages, {name: lang.name});
      this._restrictLanguages();
    }
  }

  sorceryUpdated(event): void {
    this.points.advantages = event;
    this._updateAdvantageList('restrict');
  }

  sorceryObjectUpdated(event): void {
    this.sorceryToPass = event;
  }

  randomArcana(): void {
    for (var i = 0; i < 2; i++) {
      var _i = Math.round(Math.random() * 19 + 1);
      this.selectedArcana[i] = this.arcanaOptions[_i];
    }
  }

  randomBackground(): void {
    this.showNationalBgOnly = { first: false, second: false };
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

  filterAdvantages(type: string = ''): void {
    if (type === 'reset' && this.showAllAdv) {
      this.advCostRestriction = 5;
      this.filteredAdvantages = this.advantageOptions;
    } else {
      var query = this.advQuery.toLowerCase();
      var _filteredList = [];
      _.each(this.advantageOptions, (adv: CharAdvantages) => {
        var _index = adv.name.toLowerCase().indexOf(query);
        if (_index > -1) {
          _filteredList.push(adv);
        }
      });
      this.filteredAdvantages = _filteredList;
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
    this.filteredAdvantages = this.advantageOptions;
    if (reason === 'init') {
      this.selectedAdvantages = [];
      this.duplicateAdv = [];
			_.each(this.advantageOptions, (adv: CharAdvantages) => {
				adv.disabled = false;
				adv.received = false;
				adv.selected = false;
			});
			_.each(this.selectedBackgrounds, (bg: CharBackgrounds) => {
				if (bg.quirk !== '---') {
  				_.each(bg.advantages, (adv: string) => {
  					var _index = _.findIndex(this.advantageOptions, {name: adv});
            var _selIndex = _.findIndex(this.selectedAdvantages, {name: adv});
            if (_selIndex === -1) {
              this.selectedAdvantages.push(this.advantageOptions[_index]);
    					this.advantageOptions[_index].received = true;
              this.advantageOptions[_index].selected = true;
              this.advantageOptions[_index].disabled = true;
            } else if (!this.freeForm && adv !== 'Sorcery') {
              this.advantageOptions[_index].received = true;
              this.advantageOptions[_index].selected = true;
              this.advantageOptions[_index].disabled = true;
              this.points.free = this.advantageOptions[_index].cost;
              this.duplicateAdv.push(adv);
              this._updateAdvantageList('duplicate');
            }
  					if (adv === 'Sorcery') {
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
        if (adv.bonus) {
          adv.disabled = true;
        }
			});

      this._restrictSorcery(this.selectedPeople.code);
		}

    if (reason === 'duplicate' && this.points.free > 0) {
      this.filteredAdvantages = [];
      _.each(this.advantageOptions, (adv: CharAdvantages) => {
        var cost: number;
        if ((adv.reduced === this.selectedPeople.code) || (adv.reduced === 'gla' && (this.selectedPeople.code === 'ava' || this.selectedPeople.code === 'ini' || this.selectedPeople.code === 'hig'))) {
          cost = adv.cost === 5 ? 3 : adv.cost -1;
        } else {
          cost = adv.cost;
        }
        adv.disabled = true;
        if (cost === this.points.free && !adv.received) {
          adv.disabled = false;
          this.filteredAdvantages.push(adv);
        }
      });
    }
	}

  private _restrictSorcery(code: string): void {
      var sorcIndex = _.findIndex(this.advantageOptions, {name: 'Sorcery'});
      if (code === 'null' || code === 'cas' || code === 'ves') {
        this.advantageOptions[sorcIndex].disabled = true;
      } else {
        if (!this.advantageOptions[sorcIndex].received) {
          this.advantageOptions[sorcIndex].disabled = false;
        } else {
          this.advantageOptions[sorcIndex].disabled = true;
        }
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
		if (action === 'add' && adv.name !== 'Sorcery') {
			this.selectedAdvantages.push(adv);
		}
		if (action === 'remove') {
			var _index = _.findIndex(this.selectedAdvantages, {name: adv.name});
			this.selectedAdvantages.splice(_index,1);
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

    // duelist
    var duelistIndex: number = _.findIndex(this.selectedAdvantages, {name: 'Duelist academy'});
    if (duelistIndex > -1) {
      this.isDuelist = true;
    } else {
      this.isDuelist = false;
    }

    // linguist
    var langIndex: number = _.findIndex(this.selectedAdvantages, {name: 'Linguist'});
    if (langIndex > -1) {
      this.hasLinguist = true;
      this._setupLanguages(true);
    } else {
      this.hasLinguist = false;
      this._setupLanguages(false, this.selectedPeople.name);
    }

    this.calculateWealth();

    this.selectedAdvantages = _.orderBy(this.selectedAdvantages, ['name']);
	}

  private _setupLanguages(all: boolean, nation: string = null): void {
    if (all) {
      _.each(this.languageOptions, (lang: any) => {
        lang.selected = true;
      });
      this.selectedLanguages = this.languageOptions;
    } else {
      this.selectedLanguages = [];
      _.each(this.languageOptions, (lang: any) => {
        lang.selected = false;
        lang.disabled = false;
      });
      _.each(this.languageOptions, (lang: any) => {
        if (lang.name === 'Old Théan') {
          lang.selected = true;
          lang.disabled = true;
          this.selectedLanguages.push(lang);
        }
        if (lang.name === nation || lang.name === 'Avalon' && (nation === 'Inish' || nation === 'Highlander')) {
          lang.selected = true;
          lang.disabled = true;
          this.selectedLanguages.push(lang); 
        }
      });
      this._restrictLanguages();
    }
  }

  private _restrictLanguages(): void {
    _.each(this.languageOptions, (lang: any) => {
      if (this.selectedLanguages.length >= this.traits[3].value && !lang.selected) {
        lang.disabled = true;
      } else if (!lang.disabled) {
        lang.disabled = false;
      }
    });
  }

	getSorceryType(): string {
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
					 _type = 'Knights of Avalon';
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
    var _charInfo = _.cloneDeep(this.charInfo);
    if (this.selectedReligion === 'Other') {
      _charInfo[2].value = this.otherReligion;
    } else {
      _charInfo[2].value = this.selectedReligion;
    }
    return {
      info: _charInfo,
      nation: this.selectedPeople.name,
      traits: this.traits,
      backgrounds: this.selectedBackgrounds,
      skills: this.skills,
      arcana: this.selectedArcana,
      advantages: this.selectedAdvantages,
      sorcery: this.sorceryToPass,
      stories: this.stories,
      extras: {
        wealth: this.charWealth,
        ship: this.shipDetails,
        item: this.itemDesc,
        company: this.companyDesc,
        duelist: this.selectedStyle,
        society: this.selectedSociety,
        languages: this.selectedLanguages
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
