const fs = require('fs');
const Outputer = require('./outputer');
const Permut = require('./permut');

module.exports = class mkSession {
	constructor(input, flags, output) {
		this.inputfile = input;
		this.flags = flags.substring(1).split('');
		this.outputfile = output;

		this.inputlist = fs.readFileSync(input, {
			encoding : 'utf8'
		}).split('\n').filter(x => x.trim());
		this.ostream = fs.createWriteStream(output, {
			encoding : 'utf8',
			flags : 'w+'
		});

		this.outputer = new Outputer(this.ostream);
		this.permut = new Permut(this.flags, this.inputlist);
	}

	start() {
		console.log('Working with a list of ' + this.inputlist.length + ' words');
		console.log('Using flags : ' + this.flags.join(', '));
		
		console.log('Starting at ' + new Date());
		const now = Date.now();
		this.outputer.start();
		let blk = this.permut.nextBlock();
		while (blk) {
			this.outputer.push(blk);
			blk = this.permut.nextBlock();
		}

		this.outputer.finish();
		console.log('Cleaning up...');
		console.log('Finished at ' + new Date());
		console.log('Took ' + (Date.now() - now) + 'ms');
		console.log(' ');
		console.log('Password list is located at ' + this.outputfile);
		console.log(' ');
	}
}
