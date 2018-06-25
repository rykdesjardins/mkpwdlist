const settings = require('./settings');

module.exports = class mkOutputer {
	constructor(stream) {
		this.stream = stream;
		this.buffer = [];
	}

	start() {
		this.interval = setInterval(this.flush.bind(this), settings.flushInterval);
	}

	flush() {
		const arr = this.buffer;
		this.buffer = [];
		arr.forEach(str => {
			this.stream.write(str);
		});
	}

	push(str) {
		this.buffer.push(str);
	}

	finish() {
		clearInterval(this.interval);
		this.flush();
	}
};
