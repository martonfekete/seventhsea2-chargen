import { Injectable, Inject } from '@angular/core';

declare const _:any

export interface CharTraits {
	code: string,
	name: string,
	value: number,
	favored?: boolean
}

export interface CharSkills {
	code: string,
	name: string,
	value: number,
	base?: number,
	tip?: string
}

export interface CharBackgrounds {
	name: string,
	quirk: string,
	skills: string[],
	advantages: string[],
	restriction?: string,
	selected?: boolean,
}

export interface CharAdvantages {
	name: string,
	cost: number,
	reduced?: string,
	description?: string,
	restriction?: string,
	received?: boolean,
	bought?: boolean,
	disabled?: boolean,
	selected?: boolean
}

export interface CharArcana {
	name: string,
	virtue: CharArcanaSub,
	hubris: CharArcanaSub
}

export interface CharArcanaSub {
	name: string,
	description: string,
	selected?: boolean
}

export interface TheanPeople {
	code: string,
	name: string,
	favor: string[],
	names?: any
}

@Injectable()
export class CharGenOptions {
	people: TheanPeople[];
	traits: CharTraits[];
	skills: CharSkills[];
	backgrounds: CharBackgrounds[];
	advantages: CharAdvantages[];
	arcana: CharArcana[];


	constructor() {
		this.people = [
			{ code: 'null', name: 'None selected', favor: []},
			{ code: 'ava', name: 'Avalon', favor: ['res', 'pan']},
			{ code: 'ini', name: 'Inish', favor: ['wit', 'pan']},
			{ code: 'hig', name: 'Highlander', favor: ['bra', 'fin']},
			{ code: 'cas', name: 'Castillian', favor: ['fin', 'wit']},
			{ code: 'eis', name: 'Eisen', favor: ['bra', 'res']},
			{ code: 'mon', name: 'Montaigne', favor: ['fin', 'pan']},
			{ code: 'sar', name: 'Sarmatian', favor: ['bra', 'pan']},
			{ code: 'uss', name: 'Ussuran', favor: ['res', 'wit']},
			{ code: 'ves', name: 'Vesten', favor: ['bra', 'wit']},
			{ code: 'vod', name: 'Vodacce', favor: ['fin', 'res']}
		];

		this.traits = [
			{ code: 'bra', name: 'Brawn', value: 2 },
			{ code: 'fin', name: 'Finesse', value: 2 },
			{ code: 'res', name: 'Resolve', value: 2 },
			{ code: 'wit', name: 'Wits', value: 2 },
			{ code: 'pan', name: 'Panache', value: 2 }
		];

		this.skills = [
			{ code: 'aim', name: 'Aim', value: 0 },
			{ code: 'ath', name: 'Athletics', value: 0 },
			{ code: 'bra', name: 'Brawl', value: 0 },
			{ code: 'con', name: 'Convince', value: 0 },
			{ code: 'emp', name: 'Empathy', value: 0 },
			{ code: 'hid', name: 'Hide', value: 0 },
			{ code: 'int', name: 'Intimidate', value: 0 },
			{ code: 'not', name: 'Notice', value: 0 },
			{ code: 'per', name: 'Perform', value: 0 },
			{ code: 'rid', name: 'Ride', value: 0 },
			{ code: 'sai', name: 'Sailing', value: 0 },
			{ code: 'sch', name: 'Scholarship', value: 0 },
			{ code: 'tem', name: 'Tempt', value: 0 },
			{ code: 'the', name: 'Theft', value: 0 },
			{ code: 'war', name: 'Warfare', value: 0 },
			{ code: 'wea', name: 'Weaponry', value: 0 }
		];

		this.backgrounds = [
			{ name: 'none selected', quirk: '---', advantages: [], skills: [] },
			{ name: 'archæologist ', quirk: 'earn a hero point when you turn an artifact of value over to a university, museum, or a publicly displayed site. ', advantages: ['signature item','eagle eyes'], skills: ['athletics','convince','notice','scholarship','theft'] },
			{ name: 'aristocrat ', quirk: 'earn a hero point when you prove there is more to nobility than expensive clothes and attending court. ', advantages: ['rich', 'disarming smile'], skills: ['aim', 'convince', 'empathy', 'ride', 'scholarship']},
			{ name: 'army officer ', quirk: 'earn a hero point when you seize command during a moment of intense violence or extreme danger. ', advantages: ['academy', 'direction sense'], skills: ['aim', 'athletics', 'intimidate', 'ride', 'warfare']},
			{ name: 'artist ', quirk: 'earn a hero point when you make a sacrifce in the hope of making Théah a more beautiful place. ', advantages: ['patron', 'fascinate'], skills: ['convince', 'empathy', 'perform', 'ride', 'tempt']},
			{ name: 'assassin ', quirk: 'earn a hero point when you go out of your way to avoid the death of an adversary or outright refuse a course of action because it could result in another person’s death. ', advantages: ['fencer', 'psst, over here'], skills: ['athletics', 'empathy', 'hide', 'intimidate', 'weaponry']},
			{ name: 'cavalry ', quirk: 'earn a hero point when you apply your skills in horse riding to an uncommon situation. ', advantages: ['bruiser', 'indomitable will'], skills: ['intimidate', 'notice', 'ride', 'warfare', 'weaponry']},
			{ name: 'courtier ', quirk: 'earn a hero point when you turn the tide of violence with charm and ﬂair. ', advantages: ['an honest misunderstanding', 'friend at court'], skills: ['empathy', 'perform', 'ride', 'tempt', 'weaponry']},
			{ name: 'crafter ', quirk: 'earn a hero point when you use everyday crafting skills to solve a problem deemed too complex for such a simple solution. ', advantages: ['masterpiece crafter', 'handy'], skills: ['athletics', 'convince', 'notice', 'perform', 'scholarship']},
			{ name: 'criminal ', quirk: 'earn a hero point when you break the law in the pursuit of a noble endeavor. ', advantages: ['camaraderie', 'streetwise'], skills: ['athletics', 'empathy', 'hide', 'intimidate', 'theft']},
			{ name: 'doctor ', quirk: 'earn a hero point when you tend to the injuries of a villain or the innocents harmed by a villain. ', advantages: ['miracle worker', 'time sense'], skills: ['convince', 'empathy', 'notice', 'ride', 'scholarship']},
			{ name: 'duelist ', quirk: 'earn a hero point when you resort to the edge of your blade to defend a noble ideal. ', advantages: ['duelist academy'], skills: ['athletics', 'empathy', 'intimidate', 'perform', 'weaponry']},
			{ name: 'engineer ', quirk: 'earn a hero point when you use your technological savvy to solve a problem. ', advantages: ['masterpiece crafter', 'direction sense', 'time sense'], skills: ['aim', 'convince', 'ride', 'scholarship', 'warfare']},
			{ name: 'explorer ', quirk: 'earn a hero point when you set your eyes upon a sight few, if any, théans have ever seen before. ', advantages: ['quick reﬂexes', 'second story work'], skills: ['athletics', 'convince', 'empathy', 'ride', 'sailing']},
			{ name: 'farmkid ', quirk: 'earn a hero point when you solve a complex problem in a simple, tried and true method from back on the farm. ', advantages: ['legendary trait', 'survivalist'], skills: ['athletics', 'convince', 'empathy', 'perform', 'ride']},
			{ name: 'hunter ', quirk: 'earn a hero point when you use your hunter’s acumen to save someone from danger. ', advantages: ['sniper', 'got it!'], skills: ['aim', 'hide', 'intimidate', 'notice', 'ride']},
			{ name: 'jenny ', quirk: 'earn a hero point when you resolve a conﬂict with seduction or sexual wiles. ', advantages: ['dynamic approach', 'come hither'], skills: ['aim', 'athletics', 'empathy', 'perform', 'tempt']},
			{ name: 'mercenary ', quirk: 'earn a hero point when you choose to ply your trade for a reason that’s worth more to you than money. ', advantages: ['hard to kill', 'cast iron stomach'], skills: ['athletics', 'brawl', 'intimidate', 'notice', 'weaponry']},
			{ name: 'merchant ', quirk: 'earn a hero point when you sell an item for far less than it’s worth to someone who desperately needs it. ', advantages: ['lyceum', 'time sense'], skills: ['convince', 'empathy', 'intimidate', 'ride', 'tempt']},
			{ name: 'naval officer ', quirk: 'earn a hero point when you put the needs of the crew ahead of the needs of the mission. ', advantages: ['perfect balance', 'barterer', 'sea legs'], skills: ['intimidate', 'notice', 'sailing', 'warfare', 'weaponry']},
			{ name: 'orphan ', quirk: 'earn a hero point when you put yourself in danger to ensure someone else doesn’t have to be alone. ', advantages: ['brush pass', 'reckless takedown'], skills: ['athletics', 'brawl', 'empathy', 'hide', 'intimidate']},
			{ name: 'performer ', quirk: 'earn a hero point when you use your crowd-pleasing skills for something more than making a few coins. ', advantages: ['virtuoso', 'inspire generosity'], skills: ['athletics', 'empathy', 'perform', 'tempt', 'theft']},
			{ name: 'pirate ', quirk: 'earn a hero point when you make a personal sacrifce to ensure the freedom of another. ', advantages: ['deadeye', 'indomitable will'], skills: ['aim', 'intimidate', 'notice', 'sailing', 'theft']},
			{ name: 'priest ', quirk: 'earn a hero point when you set aside the rhetoric and take action to practice the virtues you preach. ', advantages: ['ordained', 'inspire generosity'], skills: ['empathy', 'perform', 'ride', 'scholarship', 'tempt']},
			{ name: 'professor ', quirk: 'earn a hero point when you use knowledge from an obscure text to solve a complicated problem. ', advantages: ['tenure', 'team player'], skills: ['convince', 'empathy', 'perform', 'scholarship', 'tempt']},
			{ name: 'pugilist ', quirk: 'earn a hero point when you drop what you’re holding to fght with fsts regardless of your opponent\'s weapon. ', advantages: ['boxer', 'staredown'], skills: ['athletics', 'brawl', 'convince', 'empathy', 'perform']},
			{ name: 'quartermaster ', quirk: 'earn a hero point when you solve a problem for your crew. ', advantages: ['handy', 'got it!', 'sea legs'], skills: ['aim', 'brawl', 'hide', 'sailing', 'warfare']},
			{ name: 'sailor ', quirk: 'earn a hero point when you put aside your personal desires to ensure the safety and comfort of your allies. ', advantages: ['bar fighter', 'eagle eyes'], skills: ['brawl', 'notice', 'sailing', 'tempt', 'weaponry']},
			{ name: 'scholar ', quirk: 'earn a hero point when you put yourself in harm’s way in pursuit of knowledge. ', advantages: ['university', 'linguist'], skills: ['convince', 'empathy', 'notice', 'perform', 'scholarship']},
			{ name: 'servant ', quirk: 'earn a hero point when you put yourself in danger to assist another character with a difcult task. ', advantages: ['foul weather jack', 'team player'], skills: ['hide', 'notice', 'ride', 'tempt', 'theft']},
			{ name: 'ship captain ', quirk: 'earn a hero point when you’re the last one in your crew to safety. ', advantages: ['married to the sea', 'leadership', 'sea legs'], skills: ['aim', 'convince', 'notice', 'sailing', 'warfare']},
			{ name: 'soldier ', quirk: 'earn a hero point when you stick to the plan regardless of the danger to yourself. ', advantages: ['riot breaker', 'able drinker'], skills: ['aim', 'intimidate', 'notice', 'warfare', 'weaponry']},
			{ name: 'spy ', quirk: 'earn a hero point when you take a great risk to uncover a secret. ', advantages: ['opportunist', 'poison immunity'], skills: ['empathy', 'hide', 'notice', 'tempt', 'theft']},
			{ name: 'bard ', quirk: 'earn a hero point when you solve a problem by following an example set by a legend. ', advantages: ['barterer', 'virtuoso', 'able drinker'], skills: ['aim', 'convince', 'empathy', 'perform', 'ride'], restriction: 'gla'},
			{ name: 'knight errant', quirk: 'earn a hero point when you uphold an ideal of knightly virtue in a way that gets you into trouble.', advantages: ['sorcery', 'sorcery', 'direction sense'], skills: ['brawl', 'intimidate', 'ride', 'warfare', 'weaponry'], restriction: 'gla'},
			{ name: 'privateer ', quirk: 'earn a hero point when you defeat the enemies of the crown of avalon.', advantages: ['the devil’s own luck', 'perfect balance'], skills: ['notice', 'sailing', 'tempt', 'theft', 'weaponry'], restriction: 'gla'},
			{ name: 'unification agent', quirk: 'earn a hero point when you ensure the stability of the glamour isles unifcation.', advantages: ['university', 'survivalist'] , skills: ['aim', 'empathy', 'notice', 'scholarship', 'tempt'], restriction: 'gla'},
			{ name: 'puritan', quirk: 'earn a hero point when you expose corruption, hypocrisy, or ineffectiveness within the vaticine church. ', advantages: ['dynamic approach', 'reputation'], skills: ['convince', 'empathy', 'intimidate', 'ride', 'scholarship'], restriction: 'ava'},
			{ name: 'saoi (wise one)', quirk: 'earn a hero point when you put yourself in harm’s way to protect the artists of théah. ', advantages: ['team player', 'disarming smile', 'able drinker '], skills: ['athletics', 'convince', 'empathy', 'perform', 'weaponry'], restriction: 'ini'},
			{ name: 'seanchaidh (warrior-poet)', quirk: 'earn a hero point when you enforce the ancient laws of your people. ', advantages: ['riot breaker', 'linguist'], skills: ['convince', 'notice', 'perform', 'ride', 'weaponry'], restriction: 'hig'},
			{ name: 'alquimista ', quirk: 'earn a hero point when you improve another Théan\'s life through alchemy. ', advantages: ['alchemist', 'cast iron stomach '], skills: ['empathy', 'notice', 'scholarship', 'tempt', 'theft'], restriction: 'cas'},
			{ name: 'antropólogo ', quirk: 'earn a hero point when you solve a problem for a group of strangers. ', advantages: ['university', 'linguist'], skills: ['athletics', 'convince', 'empathy', 'notice', 'scholarship'], restriction: 'cas'},
			{ name: 'diestro ', quirk: 'earn a hero point when you best a trained duelist at her own game. ', advantages: ['fencer', 'disarming smile'], skills: ['athletics', 'empathy', 'intimidate', 'scholarship', 'weaponry'], restriction: 'cas'},
			{ name: 'mirabilis (priest) ', quirk: 'earn a hero point when you give of yourself to demonstrate the warmth and compassion of the vaticine church. ', advantages: ['ordained', 'spark of genius'], skills: ['convince', 'empathy', 'perform', 'ride', 'scholarship'], restriction: 'cas'},
			{ name: 'hexe ', quirk: 'earn a hero point when you go out of your way to ensure that the dead stay dead. ', advantages: ['sorcery', 'sorcery', 'cast iron stomach'], skills: ['athletics', 'intimidate', 'notice', 'tempt', 'weaponry'], restriction: 'eis'},
			{ name: 'krieger (warrior) ', quirk: 'earn a hero point when you choose to fght to defend the defenseless or prevent destruction. ', advantages: ['staredown', 'academy'], skills: ['aim', 'athletics', 'ride', 'warfare', 'weaponry'], restriction: 'eis'},
			{ name: 'ungetümjäger (monster hunter) ', quirk: 'earn a hero point when you choose to hunt down an inhuman creature so it will never hurt anyone ever again. ', advantages: ['i won\'t die here', 'indomitable will'], skills: ['aim', 'athletics', 'brawl', 'notice', 'weaponry'], restriction: 'eis'},
			{ name: 'vitalienbruder (pirate) ', quirk: 'earn a hero point when you take from the rich to give to the poor. ', advantages: ['leadership', 'streetwise', 'sea legs'], skills: ['brawl', 'hide', 'sailing', 'theft', 'warfare'], restriction: 'eis'},
			{ name: 'l\'ami du roi (courtier) ', quirk: 'earn a hero point when you leverage the king\'s favor to solve a problem. ', advantages: ['connection', 'friend at court', 'linguist'], skills: ['convince', 'perform', 'ride', 'tempt', 'weaponry'], restriction: 'mon'},
			{ name: 'mousquetaire ', quirk: 'earn a hero point when you take a serious injury to protect your comrades or king. ', advantages: ['camaraderie', 'quick reﬂexes'], skills: ['aim', 'intimidate', 'notice', 'ride', 'weaponry'], restriction: 'mon'},
			{ name: 'révolutionnaire ', quirk: 'earn a hero point when you make a personal sacrifce for the sake of liberty. ', advantages: ['joie de vivre', 'slip free'], skills: ['hide', 'notice', 'ride', 'theft', 'weaponry'], restriction: 'mon'},
			{ name: 'sorcier porté ', quirk: 'earn a hero point when you close a blessure that a villain ripped open. ', advantages: ['sorcery', 'sorcery', 'time sense'], skills: ['empathy', 'hide', 'ride', 'scholarship', 'tempt'], restriction: 'mon'},
			{ name: 'poseł (envoy) ', quirk: 'earn a hero point when you insist on democracy when it would be advantageous for you to not take a vote. ', advantages: ['leadership', 'lyceum'], skills: ['convince', 'empathy', 'intimidate', 'perform', 'tempt'], restriction: 'sar'},
			{ name: 'tremtis (expatriate) ', quirk: 'earn a hero point when something from your past comes back to haunt you. ', advantages: ['foreign born', 'streetwise', 'connection'], skills: ['brawl', 'empathy', 'hide', 'notice', 'theft'], restriction: 'sar'},
			{ name: 'winged hussar ', quirk: 'earn a hero point when you and your steed plunge headfrst into a battle or conﬂict, heedless of the danger. ', advantages: ['together we are strong', 'team player'], skills: ['convince', 'notice', 'ride', 'warfare', 'weaponry'], restriction: 'sar'},
			{ name: 'žynys (soothsayer) ', quirk: 'earn a hero point when you use something evil for good.', advantages: ['sorcery', 'sorcery', 'linguist'], skills: ['athletics', 'convince', 'perform', 'scholarship', 'weaponry'], restriction: 'sar'},
			{ name: 'cossack ', quirk: 'earn a hero point when you leave behind something important so you can travel light. ', advantages: ['strength of ten', 'reckless takedown'], skills: ['brawl', 'intimidate', 'notice', 'ride', 'weaponry'], restriction: 'uss'},
			{ name: 'progressivist ', quirk: 'earn a hero point when you risk life and limb to secure a piece of advanced technology. ', advantages: ['extended family', 'handy', 'connection'], skills: ['athletics', 'convince', 'empathy', 'ride', 'tempt'], restriction: 'uss'},
			{ name: 'touched by matushka ', quirk: 'earn a hero point when you teach someone a lesson in a way that would make matushka proud. ', advantages: ['sorcery', 'sorcery', 'survivalist'], skills: ['athletics', 'intimidate', 'perform', 'tempt', 'theft'], restriction: 'uss'},
			{ name: 'whaler ', quirk: 'earn a hero point when you face a creature that could swallow a man whole. ', advantages: ['able drinker', 'sea legs', 'patron'], skills: ['athletics', 'brawl', 'notice', 'sailing', 'weaponry'], restriction: 'uss'},
			{ name: 'bearsark ', quirk: 'earn a hero point when you let the game master choose your character\'s next action. ', advantages: ['hard to kill', 'able drinker'], skills: ['brawl', 'intimidate', 'sailing', 'warfare', 'weaponry'], restriction: 'ves'},
			{ name: 'guildmästaren ', quirk: 'earn a hero point when you use the vast resources of the vendel league for something more noble than proft. ', advantages: ['masterpiece crafter', 'rich'], skills: ['convince', 'empathy', 'ride', 'scholarship', 'tempt'], restriction: 'ves'},
			{ name: 'sjørøver (pirate) ', quirk: 'earn a hero point when put yourself in danger in order to ensure your place of honor at the allfather’s table. ', advantages: ['i\'m taking you with me', 'staredown'], skills: ['brawl', 'intimidate', 'notice', 'sailing', 'weaponry'], restriction: 'ves'},
			{ name: 'skald ', quirk: 'earn a hero point when you use your knowledge as a seidr to help another hero to solve a problem or thwart a villain. ', advantages: ['seidr', 'sea legs'], skills: ['brawl', 'intimidate', 'perform', 'sailing', 'weaponry'], restriction: 'ves'},
			{ name: 'bravo ', quirk: 'earn a hero point when you put yourself in danger to defend the life of the person you’ve sworn to protect. ', advantages: ['poison immunity', 'hard to kill'], skills: ['athletics', 'empathy', 'intimidate', 'notice', 'weaponry'], restriction: 'vod'},
			{ name: 'consigliere ', quirk: 'earn a hero point when you take a great risk to protect someone else’s secret. ', advantages: ['we\'re not so different...', 'streetwise'], skills: ['convince', 'empathy', 'notice', 'ride', 'tempt'], restriction: 'vod'},
			{ name: 'esploratore ', quirk: 'earn a hero point when you use non-théan items or knowledge to solve a problem. ', advantages: ['lyceum', 'linguist'], skills: ['convince', 'empathy', 'intimidate', 'sailing', 'tempt'], restriction: 'vod'},
			{ name: 'sorte strega', quirk: 'earn a hero point when you commit to a dangerous course of action that you believe is destiny. ', advantages: ['sorcery', 'sorcery', 'time sense'], skills: ['convince', 'hide', 'perform', 'ride', 'tempt'], restriction: 'vod'}
		];

		this._setupBackgrounds();

		this.advantages = [
			{ name: 'able drinker', cost: 1},
			{ name: 'cast iron stomach', cost: 1},
			{ name: 'direction sense', cost: 1 },
			{ name: 'foreign born', cost: 1 },
			{ name: 'large', cost: 1 },
			{ name: 'linguist', cost: 1 },
			{ name: 'sea legs', cost: 1 },
			{ name: 'small', cost: 1 },
			{ name: 'survivalist', cost: 1 },
			{ name: 'time sense', cost: 1 },
			{ name: 'barterer', cost: 2, reduced: 'gla' },
			{ name: 'come hither', cost: 2 },
			{ name: 'connection', cost: 2 },
			{ name: 'disarming smile', cost: 2 },
			{ name: 'eagle eyes', cost: 2 },
			{ name: 'extended family', cost: 2, reduced: 'uss' },
			{ name: 'fascinate', cost: 2 },
			{ name: 'friend at court', cost: 2 },
			{ name: 'got it!', cost: 2 },
			{ name: 'handy', cost: 2 },
			{ name: 'indomitable will', cost: 2 },
			{ name: 'inspire generosity', cost: 2 },
			{ name: 'leadership', cost: 2, reduced: 'sar' },
			{ name: 'married to the sea', cost: 2 },
			{ name: 'perfect balance', cost: 2 },
			{ name: 'poison immunity', cost: 2, reduced: 'vod' },
			{ name: 'psst, over here', cost: 2 },
			{ name: 'reckless takedown', cost: 2 },
			{ name: 'reputation', cost: 2 },
			{ name: 'second story work', cost: 2 },
			{ name: 'slip free', cost: 2 },
			{ name: 'sorcery', cost: 2 },
			{ name: 'staredown', cost: 2 },
			{ name: 'streetwise', cost: 2 },
			{ name: 'team player', cost: 2 },
			{ name: 'valiant spirit', cost: 2 },
			{ name: 'an honest misunderstanding', cost: 3 },
			{ name: 'bar fighter', cost: 3 },
			{ name: 'boxer', cost: 3 },
			{ name: 'bruiser', cost: 3 },
			{ name: 'brush pass', cost: 3 },
			{ name: 'camaraderie', cost: 3, reduced: 'mon' },
			{ name: 'deadeye', cost: 3 },
			{ name: 'dynamic approach', cost: 3 },
			{ name: 'fencer', cost: 3 },
			{ name: 'foul weather jack', cost: 3 },
			{ name: 'masterpiece crafter', cost: 3, reduced: 'ves' },
			{ name: 'opportunist', cost: 3 },
			{ name: 'ordained', cost: 3, reduced: 'cas' },
			{ name: 'patron', cost: 3 },
			{ name: 'quick reflexes', cost: 3 },
			{ name: 'rich', cost: 3 },
			{ name: 'signature item', cost: 3 },
			{ name: 'sniper', cost: 3 },
			{ name: 'tenure', cost: 3 },
			{ name: 'virtuoso', cost: 3 },
			{ name: 'academy', cost: 4 },
			{ name: 'alchemist', cost: 4, restriction: 'cas' },
			{ name: 'hard to kill', cost: 4 },
			{ name: 'legendary trait', cost: 4 },
			{ name: 'lyceum', cost: 4 },
			{ name: 'miracle worker', cost: 4 },
			{ name: 'riot breaker', cost: 4 },
			{ name: 'seidr', cost: 4, restriction: 'ves' },
			{ name: 'specialist', cost: 4 },
			{ name: 'trusted companion', cost: 4 },
			{ name: 'university', cost: 4 },
			{ name: 'duelist academy', cost: 5 },
			{ name: 'i won’t die here', cost: 5, reduced:'eis' },
			{ name: 'i’m taking you with me', cost: 5, reduced:'ves' },
			{ name: 'joie de vivre', cost: 5, reduced:'mon' },
			{ name: 'spark of genius', cost: 5, reduced:'cas' },
			{ name: 'strength of ten', cost: 5, reduced:'uss'},
			{ name: 'the devil’s own luck', cost: 5, reduced:'gla' },
			{ name: 'together we are strong', cost: 5, reduced:'sar' },
			{ name: 'we’re not so different...', cost: 5, reduced:'vod' }
		];

		this._setupAdvantages();

		this.arcana = [
			{ name: '---', virtue: { name: 'None selected', description: '---'}, hubris: { name: 'None selected', description: '---'}},
			{ name: 'The Fool ', virtue: { name: ' Wily', description: 'Activate your Virtue to escape danger from the current Scene. You cannot rescue anyone but yourself. '}, hubris: { name: ' Curious', description: 'You receive a Hero Point when you investigate something unusual, especially if it looks dangerous. '}},
			{ name: 'The Road ', virtue: { name: ' Friendly', description: 'Activate your Virtue when you meet a character (even a Villain) for the frst time. She treats you as friendly for one scene. '}, hubris: { name: ' Underconfdent', description: 'You receive a Hero Point when your Hero decides he cannot take an action without help from another Hero—insisting another Hero spend a Hero Point to give you Bonus Dice, or asking her to use one of her Advantages to aid you, for example. '}},
			{ name: 'The Magician ', virtue: { name: ' Willful', description: 'Activate your Virtue and target a Villain. Until the end of this Scene, you cannot spend Hero Points and the Villain cannot spend Danger Points. '}, hubris: { name: ' Ambitious', description: 'You receive a Hero Point when you chase after power and the deal you’re after is dangerous or causes trouble. '}},
			{ name: 'The Lovers ', virtue: { name: ' Passionate', description: 'Activate your Virtue when another Hero takes Wounds to prevent her from suffering those Wounds. You take one Dramatic Wound instead. '}, hubris: { name: ' Star-Crossed', description: 'You receive a Hero Point when your Hero becomes enamored with someone she really shouldn’t. '}},
			{ name: 'The Wheel ', virtue: { name: ' Fortunate', description: 'Activate your Virtue to delay an Opportunity or a Consequence by 1 Action. '}, hubris: { name: ' Unfortunate', description: 'You receive 2 Hero Points when you choose to fail an important Risk before rolling. '}},
			{ name: 'The Devil ', virtue: { name: ' Astute', description: 'Activate your Virtue after a Villain spends Raises for an Action. Tat Action fails. Te Villain still loses the Raises she spent. '}, hubris: { name: ' Trusting', description: 'You receive a Hero Point when you accept someone’s lies or lopsided deal. '}},
			{ name: 'The Tower ', virtue: { name: ' Humble', description: 'Activate your Virtue to gain 2 Hero points instead of 1 when you activate your Hubris or trigger a Quirk. '}, hubris: { name: ' Arrogant', description: 'You receive a Hero Point when your Hero shows disdain, contempt, or otherwise looks down on a Villain or someone who could cause harm to friends. '}},
			{ name: 'The Beggar ', virtue: { name: ' Insightful', description: 'Activate your Virtue to discover a Brute Squad’s type, or to know a Villain’s Rank and Advantages. '}, hubris: { name: ' Envious', description: 'You receive a Hero Point when your Hero covets something, and does something unwise to get it. '}},
			{ name: 'The Witch ', virtue: { name: ' Intuitive', description: 'Activate your Virtue to ask the GM one yes or no question about an NPC. Te GM must answer honestly and should be generous—for example, if there is a qualifer, he should tell you and explain more fully. '}, hubris: { name: ' Manipulative', description: 'You receive a Hero Point when you try to get someone else to do your dirty work for you, and it backfres. '}},
			{ name: 'The War ', virtue: { name: ' Victorious', description: 'Activate your Virtue the frst time you Wound a Villain during a fght to make her take a Dramatic Wound in addition to the Wounds you normally deal. '}, hubris: { name: ' Loyal', description: 'You receive a Hero Point when your Hero goes back for a fallen comrade or refuses to leave a wounded ally. '}},
			{ name: 'The Hanged Man ', virtue: { name: ' Altruistic', description: 'Activate your Virtue to suffer a Risk’s Consequences in place of another Hero. '}, hubris: { name: ' Indecisive', description: 'You receive a Hero Point when your Hero takes an Action to pause in hesitation, doubt, or uncertainty before she makes a move. '}},
			{ name: 'Coins for the Ferryman ', virtue: { name: ' Adaptable', description: 'Activate your Virtue to take your frst Action before anyone else in a Round. '}, hubris: { name: ' Relentless', description: 'You receive a Hero Point when you refuse to leave well enough alone or quit while you’re ahead, and it gets you into trouble. '}},
			{ name: 'The Thrones ', virtue: { name: ' Comforting', description: 'Activate your Virtue to cancel the effects of Fear on you and your friends. '}, hubris: { name: ' Stubborn', description: 'You receive a Hero Point when your Hero is stubborn and refuses to change her mind in the face of evidence. '}},
			{ name: 'The Moonless Night ', virtue: { name: ' Subtle', description: 'Activate your Virtue when you act behind the scenes, from the shadows, or through a proxy. For the next Risk, when you determine Raises, every die counts as a Raise. '}, hubris: { name: ' Confusion', description: 'You receive a Hero Point when your Hero fails to understand an important plot element and that misunderstanding leads to danger for herself or others. '}},
			{ name: 'The Sun ', virtue: { name: ' Glorious', description: 'Activate your Virtue when you are the center of attention. For the next Risk, when you determine Raises, every die counts as a Raise. '}, hubris: { name: ' Proud', description: 'You receive a Hero Point when your Hero refuses an offer of aid—for example, if a Hero tries to spend a Hero Point to give you Bonus Dice and you turn them down. '}},
			{ name: 'The Prophet ', virtue: { name: ' Illuminating', description: 'Activate your Virtue to know whenever any other character lies to you until the end of the Scene. '}, hubris: { name: ' Overzealous', description: 'You receive a Hero Point when your Hero strongly defends one of her opinions when the time or place is inappropriate. '}},
			{ name: 'Reunion ', virtue: { name: ' Exemplary', description: 'Activate your Virtue and choose another Hero in the same scene to pool your Raises for the round, spending Raises to take Actions from your shared pool. '}, hubris: { name: ' Bitterness', description: 'You receive a Hero Point when you bring up old grudges or bad feelings when doing so will lead to trouble. '}},
			{ name: 'The Hero ', virtue: { name: ' Courageous', description: 'Activate your Virtue to add Bonus Dice to your Risk equal to the Fear rating of your target. '}, hubris: { name: ' Foolhardy', description: 'You receive a Hero Point when your brash, cocky, or reckless actions cause trouble for you and another Hero. '}},
			{ name: 'The Glyph ', virtue: { name: ' Temperate', description: 'Activate your Virtue to prevent any magical effect (Sorcery, Artifacts, Monsters, etc.) from affecting you. '}, hubris: { name: ' Superstitious', description: 'You receive a Hero Point when you refuse to solve a problem using Sorcery, an artifact, or some other mystical effect that you don’t trust. '}},
			{ name: 'The Emperor ', virtue: { name: ' Commanding', description: 'Activate your Virtue. Te GM gives a Hero Point to all other Heroes in this Scene. '}, hubris: { name: ' Hot-Headed', description: 'You receive a Hero Point when your Hero ﬂies off the handle and loses her temper, causing trouble.'}}
		];
	}

	private _setupBackgrounds(): void {
		_.each(this.backgrounds, (bg: CharBackgrounds) => {
			var _skills: string[] = [];
			var _adv: string[] = [];
			bg.name = bg.name.slice(0,1).toUpperCase() + bg.name.slice(1);
			bg.quirk = bg.quirk.slice(0,1).toUpperCase() + bg.quirk.slice(1);
			_.each(bg.skills, (skill: string) => {
				_skills.push(skill.slice(0,3));
			});
			bg.skills = _skills;
			_.each(bg.advantages, (adv: string) => {
				_adv.push(adv.slice(0,1).toUpperCase() + adv.slice(1));
			});
			bg.advantages = _adv;
		});
	}

	private _setupAdvantages(): void {
		var _advDescriptions = [
			"Alcohol never adversely affects you, no matter how much you drink.",
			"Spoiled or raw food never negatively affects you, and you still gain required sustenance from it.",
			"As long as you have some point of reference, you are never lost. Tat isn’t the same as knowing exactly where you are — if you’re knocked unconscious and wake up in a dungeon, you don’t necessarily have any idea what city you are in, but if you manage to escape your cell you will never get turned around in the winding tunnels that make up the dungeon.",
			"Choose a Nation of Téah aside from your own. You were raised there, rather than your blood homeland. For example, if your parents are Castillian but you were raised in Vodacce, you would be Foreign Born [Vodacce]. Any Risk you take that would beneft from your dual heritage — using Convince to negotiate between two merchants who hail from your two cultures, or using Thempt to know just what to say to bribe a border patrol into letting you pass without inspection — gains 1 Bonus Die.",
			"You cannot purchase the \"Small\" Advantage Gain 1 Bonus Die on any Risk that is easier due to your size — using Athletics to run at full speed even while carrying another Hero, or looming over someone in order to Intimidate them.",
			"You speak, read, and write all Téan languages. Even the dead ones.",
			"While aboard a ship, treacherous footing never affects you. You gain 1 Bonus Die on any physical Risk while aboard a ship at sea — engaging in a sword fght on a pitching ship deck, or climbing through the rigging during a storm.",
			"You cannot purchase the \"Large\" Advantage You are smaller than the average Téan. Much smaller. If your small size makes a Risk easier — using Hide to squeeze into a tiny space and escape a guard patrol, or using Athletics to slip between the bars of a jail cell — gain 1 Bonus Die.",
			"If you are in the wilderness, you can forage or hunt and fnd enough food for yourself and up to fve other people. Under extreme circumstances — lost in the middle of a desert, or abandoned in the Ussuran tundra, for example — you fnd enough food for yourself and up to two other people.",
			"You always know what time it is. You know how long until the next sunrise or sunset, with less than a one minute margin of error.",
			"Spend a Hero Point to convince someone to cut you a deal, give you a reasonable discount, or assure someone who knows you that \"you’re good for it.\"",
			"Spend a Hero Point to lure another character into a private room and later leave said private room without him, removing him from the scene. He may be rescued after you’re long gone.",
			"You have connections who can give you information or help you out when you need it. Choose a type of contact — \"Freiburg underworld,\" \"Five Sails city watch,\" or \"Vodacce high society courtiers,\" for example. You can always make contact with someone of that type who will give you basic information or help you in some minor way, so long as it doesn’t cost them anything or put them in danger. If you want more hard-to-fnd information or a dangerous favor, you must spend a Hero Point or agree to a cost that your connection stipulates, such as paying them money or agreeing to do a favor for them in return.",
			"Spend a Hero Point to keep another character from drawing a weapon, starting a fght, or resorting to violence. She will still defend herself, but she will not start any violent conﬂicts.",
			"As long as you have a clear line of sight, you can see perfectly out to a distance of one mile. If you use a spyglass you can even pick out fne details, such as the inscription carved into a wedding band. If you make a Risk that relies heavily on your keen vision, you gain 1 Bonus Die.",
			"Spend a Hero Point to reveal you have a distant cousin who lives nearby and can help you with materials, information, or shelter.",
			"Spend a Hero Point to capture the attention of another character. Tat character pays attention only to you until the end of the Scene or until you cease speaking/paying attention, whichever comes first.",
			"When you are at a ball, feast, or similar high society function, spend a Hero Point to reveal you have a close friend also in attendance.",
			"Spend a Hero Point to immediately pick a lock, crack a safe, or disarm a trap.",
			"Spend a Hero Point to repair a broken item, rig a damaged gun, patch a leaky ship, or perform similar miracles, causing the object to function normally for the rest of the Scene. At the end of the Scene — or if the object suffers any additional damage — the object becomes unusable until you have time to perform serious repairs with the proper tools.",
			"After another character attempts to intimidate, seduce, or otherwise goad you, spend a Hero Point to automatically resist.",
			"Spend a Hero Point to convince another character to grant you an object you want at no cost. They might give you something they already have or go to some lengths — legal or illegal — to procure the item, whatever is the easiest way for them to get their hands on what you want.",
			"Spend a Hero Point to inspire a group to action. The group must be able to hear you, but if they can and they are of neutral or better disposition, they will do whatever you command so long as it is reasonable —  they are unlikely to all throw themselves off a bridge to certain death, for example.",
			"You have access to a Ship. If you and your allies already have access to a Ship, your Ship gains an additional Background. See the Sailing chapter for more information.",
			"Spend a Hero Point to move across a thin beam, jump from one place to another, or otherwise perform a feat of perfect agility and balance.",
			"Poison never affects you, aside from some potential mild discomfort. If the poison would ordinarily kill you, it might cause you only to vomit instead, but there are no additional effects.",
			"While undetected, you can spend a Hero Point to lure a single character out of position and knock him out. Any other characters in the area remain unaware of your presence.",
			"Spend a Hero Point to immediately defeat a single Brute Squad, regardless of its Strength. You immediately take 1 Dramatic Wound.",
			"You determine what your Reputation is with a single adjective — \"Honorable,\" \"Vicious,\" etc. — When you use your reputation to your advantage in a social Risk, you gain 1 Bonus Die. A Hero can buy this Advantage multiple times. Each time she does, she can choose to gain either a new Reputation or to increase the number of Bonus Dice she gains when she invokes her existing Reputation.",
			"You can spend a Hero Point to locate a way into a building or restricted area. You can bring up to one other character along with you, but everyone else has to fnd their own way in — or wait for you to open a path for them.",
			"Spend a Hero Point to slip your hands free from manacles, loosen the rope tying you to a chair, or similarly free yourself.",
			"You gain the Sorcery from your National bloodline. If you purchase this Advantage after Hero Creation, you may only do so with a Hero Story. See the Sorcery chapter for more information.",
			"Spend a Hero Point to intimidate a character into backing down from a threat, letting you into somewhere he shouldn’t, or otherwise getting out of your way.",
			"You can spend a Hero Point to locate a fixer, an information broker, a black market, or a similar underworld fgure.",
			"When you spend a Raise to create an Opportunity, you can spend a second Raise. If you do, you activate the Opportunity on behalf of another willing Hero —  she doesn’t need to spend her own Raise.",
			"You begin each game with 2 Hero Points instead of 1.",
			"Spend a Hero Point to edit, redact, or otherwise alter something you or another Hero just said, \"reinterpreting\" the words into the kindest compliment.",
			"You gain 1 Bonus Die when you make a Brawling Risk to fght using an upturned table, a barstool, a plank of wood or some other improvised weapon.",
			"You gain 1 Bonus Die when you make a Brawling Risk to punch, kick, headbutt or otherwise injure another character using nothing but your own body.",
			"You gain 1 Bonus Die when you make a Weaponry Risk using a claymore, zweihander, battle axe, halberd or similar weapon in both hands.",
			"Spend a Hero Point to pick a pocket, steal a ring from another character’s fnger, or plant a small hand-held item on another character without him noticing.",
			"Whenever you spend a Hero Point to aid an ally, they gain four dice instead of three.",
			"You gain 1 Bonus Die when you make an Aim Risk using a pistol, blunderbuss, or a thrown weapon such as a knife or axe.",
			"Spend a Hero Point to change your Approach during an Action Sequence or Dramatic Sequence.",
			"You gain 1 Bonus Die when you make a Weaponry Risk using a rapier, dagger, cutlass or similar weapon in one hand.",
			"Your Hero gains a second Story. You create this Story in the same manner as all other Hero Stories, and its progression and rewards are determined independently. When this Story is completed, you may write a new one.",
			"Choose one type of item — weapons, armor, paintings, etc. When you create such an item, you may increase the time you work on it in order to create an item of greater quality. If you are using typical, mundane materials, this has no additional effect aside from cosmetic — the item is noticeably higher quality than similar items, and may even bear your mark, earn you notoriety for your fne work, draw a higher price if it is for sale, etc. If you use exotic materials — such as creating a sword using metal from a fallen star, for example — you can create a Signature Item for yourself or another Hero. The time required to create a Signature Item, and whether or not a material is \"special\" enough to qualify, is always a GM’s discretion.",
			"When another Hero spends a Raise to create an Opportunity, you can spend a Hero Point to immediately activate the Opportunity for yourself.",
			"You can expect refuge, a place to stay, and hot meals in any church. You also have access to many — but not all — of the Church’s libraries. Finally, you gain two dice for any social Risks against characters who are adherents to your faith.",
			"You have a patron, either an individual or an organization, who appreciates your work and supplies you with steady employment. You begin each session with 1 Wealth. You may spend a Hero Point to call in a favor from your Patron. Tis favor is typically political or mercantile in some way — your Patron might provide you a letter of introduction, or pull strings to get you into an exclusive party, etc. Your Patron may ask you for favors or have other expectations for you, such as expecting you to produce goods or art on her behalf if you are an artist or aiding the populace in her name if you are a knight.",
			"Choose one Skill. You always take actions as if you had an additional Raise to spend when you use that Skill. For example, if a Hero has Quick Reﬂexes with Weaponry and rolls 3 Raises with that Skill, she takes her frst Action on 4 Raises. If she spends 1 Raise to take an action (and so has 2 Raises remaining) her next Action occurs on 3 Raises. A Hero can buy this Advantage multiple times. Each time they do, they choose a different Skill.",
			"You begin each session with 3 Wealth.",
			"Choose a specifc item that is important to you. Describe it, decide why it is important, and maybe even give it a name. You can always spend a Hero Point to... (1) have your Signature Item appear in the next scene if you lose it or it is stolen. (2) gain 2 Bonus Dice on a Risk when using your Signature Item. (3) attack a foe to deal Wounds equal to the Raises you spend plus your highest Trait when using the Signature Item. (4) prevent a number of Wounds equal to the Raises you spend plus your highest Trait when using the Signature item. You must always describe how your Signature Item helps you, and it must make sense for the item to gain you any bonuses in this way (GM discretion).",
			"You gain 1 Bonus Die when you make an Aim Risk using a long-barrelled musket, longbow, or crossbow.",
			"You can expect refuge, a place to stay, and hot meals in any university. You also have access to many — but not all — of a university’s libraries simply by requesting it. Finally, you gain 2 Bonus Dice for any social Risks against characters who are members of an institution of higher learning or who respect such an education.",
			"Choose a specifc Performance type, such as singing, playing a specifc musical instrument, or dancing. You gain 1 Bonus Die when you make a Perform Risk using that art.",
			"You studied strategy, horsemanship, and soldiering at one of Téah’s many military academies. When you make a Risk using Athletics, Warfare or Ride, all of your dice gain +1 to their value.",
			"Spend a Hero Point to produce an elixir or potion that provides an immediate beneft. Using the alchemical concoction requires a Raise during an Action Sequence or a Dramatic Sequence. These are some examples of uses for alchemical concoctions. There may be others. If you want to create one of your own, consult with your GM. (1) Explosion: The concoction causes an explosion of choking smoke and fre, creating an Opportunity you and others can use to escape the Scene. (2) Enhancement: You gain 1 Rank in 1 Trait for 1 Round. (3) Oil: Anything covered with the concoction is slick and nearly impossible to hold. If poured on the ﬂoor, anyone walking or running on the surface will slip and fall. If poured down a wall, anyone trying to climb the wall slips and falls as well.",
			"You no longer become Helpless when you have four Dramatic Wounds. Instead, when you have four Dramatic Wounds any Villain who takes a Risk against you gains 3 Bonus Dice (rather than 2). You gain an additional tier of Wounds. When you have taken your ffth Dramatic Wound, you become Helpless.",
			"Choose a Trait. Whenever you roll a Risk using that Trait, you remove one die from your pool before you roll. That die is always considered to roll a 10. If your 10s explode, your free Legendary Trait 10 explodes as well.",
			"You studied rhetoric and debate, and refned your social graces at one of Téah’s many lyceums, fnishing schools typically reserved for the social and noble elite. When you make a Risk using Convince, Intimidate, or Tempt, all of your dice gain +1 to their value.",
			"Perhaps it was study with the Church or a local shaman, but you know wounds and how to deal with them. Spend a Hero Point and 1 Raise on your Action to heal another Hero: they regain 1 Dramatic Wound. You must be able to touch the Hero you are healing.",
			"You’re used to your opponents coming in double digits. When you take Wounds from a Brute Squad, subtract your Resolve from the Wounds. The remainder is how many Wounds you take, to a minimum of 1 Wound.",
			"You have studied under a Vesten Skald. You learned how to see the Names of things, how to know the future based on how the ﬂames of a bonfre dance, and how to guide the passions of people either to laud your heroes or deride your enemies. Spend a Hero Point and make a speech about another character. He gains a 1 Rank Reputation (as the Advantage of the same name) of your choice, increases an existing Reputation by 1 Rank, or you change their Reputation to a different Reputation of your choice (but the Rank remains the same). If you change a character’s existing Reputation, anyone who uses the new Reputation against him gains Bonus Dice equal to that Reputation’s Rank. Spend a Hero Point to cast runes, dice, or bones. When you do so, ask the GM a single yes or no question about the future. The GM must answer honestly, but only needs to respond yes or no. If the event in question can be changed by the actions of others, such as whether or not a person will die, then the answer given represents the outcome that is currently most likely, but otherwise this power is never wrong. Spend a Hero Point when you look at another mortal human. You know that person’s name. No disguise can hide the name from you, nor will you believe any lie designed to obscure the name. For the rest of the Scene, you always recognize it, no matter how it changes.",
			"When you purchase this Advantage, choose a Skill that you have at least 3 Ranks in to become your Specialist Skill. When you make a Risk using any other Skill during an Action or Dramatic Sequence, you do not have to pay additional Raises to Improvise with your Specialist Skill. A Hero can only have a single Specialist Skill; purchasing this Advantage again lets you choose a new Specialist Skill, but you lose your old one.",
			"You have a small group of individuals who are devoted to you, or a single trusted ally who would walk through fre for you (a bodyguard, a horse, etc.). If your allies directly aid you in a Risk, you gain a Bonus Die if you describe specifcally how they aid you. If you send them out to accomplish something else and they need to make a Risk (GM discretion), they roll fve dice. Your Trusted Companion can take 5 Wounds before he becomes Helpless, and will more than likely require you to rescue him.",
			"You attended one of Téah’s formal universities and are familiar with many academic felds of study such as mathematics, architecture, and astronomy. When you make a Risk using Scholarship, Empathy, or Notice, all of your dice gain +1 to their value.",
			"You may choose a Dueling Style. If you purchase this Advantage again, you gain an additional Dueling Style. See the Dueling chapter for more information.",
			"Spend a Hero Point to ignore all negative effects from Dramatic Wounds for the round — the Villain does not gain Bonus Dice if you have 2 Dramatic Wounds, and you do not become Helpless at 4 Dramatic Wounds.",
			"Spend a Hero Point to have all damage that you do this Round increased by the number of Dramatic Wounds you have.",
			"Just before a confrontation with a Villain occurs, spend a Hero Point and make some sort of pithy or clever comment about how \"When things look darkest, that’s when souls shine brightest.\" Each Hero — that hears the speech — counts all dice that roll equal to or under his Skill on his next roll as 10s.",
			"Choose a specifc feld of academic study (astronomy, mathematics, architecture, history, etc). When you make a Risk and call on your specialized feld of study, spend a Hero Point to gain additional Raises equal to your Wits.",
			"When you perform a feat of raw strength (lifting a castle portcullis, holding a door closed against a battering ram on the other side, etc.), spend a Hero Point to increase all of your individual dice for that Risk by your Brawn or your Resolve, whichever is greater. For example, if you are trying to keep a crumbling wall from collapsing so that your friends can escape, spend a Hero Point to increase the number on each of your individual dice by your Brawn score.",
			"Spend a Hero Point after you take a Risk to Re-Roll any number of dice you wish. You must keep the new roll, unless you have a different effect that allows you to Re-Roll dice. You can only use this Advantage once per Scene.",
			"Spend a Hero Point to give any number of your Raises to another Hero in the same scene, as long as they can see or hear you.",
			"Spend a Hero Point to convince a Villain you are on her side. The Villain considers you a trusted ally. As soon as the Villain sees you perform a Heroic action or if you refuse to perform a Villainous action, the illusion is over. You can only use this Advantage on each Villain once. \"Fool me once...\""
		];
		_.each(_advDescriptions, (desc: string, index: number) => {
			this.advantages[index].description = desc;
		});
		this.advantages = _.orderBy(this.advantages, ['name']);
		_.each(this.advantages, (adv: CharAdvantages) => {
			adv.name = adv.name.slice(0,1).toUpperCase() + adv.name.slice(1);
		});
	}
}

/*

*/