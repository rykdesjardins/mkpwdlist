const flagToFn = {
	"m" : "_mixWordsIntoList",
	"n" : "_prependNumbers",
	"N" : "_appendNumbers",
	"c" : "_mixInCharacters",
	"H" : "_outputHexaList"
};

const settings = require('./settings.json');

module.exports = class mkPermut {
	constructor(flags, wordlist) {
		this.flags = flags;
		this.words = wordlist.filter(x => x.trim());

		this.flagCursor = -1;
	}

	_mixWordsIntoList() {
		const nxt = (n, src, got, all) => {
			if (n) for (let j = 0; j < src.length; j++) {
				nxt(n - 1, src.slice(j + 1), got + ([src[j]]), all);
			} else if (got.length) all[all.length] = got;
		};

		const all = [];
		for (let i = 1; i < this.words.length && i < settings.maxWordMix; i++) nxt(i, this.words, [], all);
		
		all.push();
		this.words = all;

		return all.filter(x => x).join('\n');
	}

	_mixInCharacters() {
		const characters = settings.characters.split('');
		
		const all = [];
		this.words.forEach(base => {
			characters.forEach(c => {
				all.push(c + base);
				all.push(base + c);
			});
		});

		return all.join('\n');
	}

	_prependNumbers() {
		const all = [];
		this.words.forEach(base => {
			for (let i = settings.numberGenStart; i <= settings.numberGenEnd; i++) {
				all.push(i.toString() + base);
			}
		});

		return all.join('\n');
	}

	_appendNumbers() {
		const all = [];
		this.words.forEach(base => {
			for (let i = settings.numberGenStart; i <= settings.numberGenEnd; i++) {
				all.push(base + i);
			}
		});

		return all.join('\n');
	}

	nextBlock() {
		const flag = this.flags[++this.flagCursor];
		if (!flag) return;

		const fnName = flagToFn[flag];
		if (!fnName) return this.nextBlock();

		const fn = this[fnName].bind(this);
		return fn.call();
	}
}
