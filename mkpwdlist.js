const Session = require('./session');

const args = process.argv.splice(2);

if (args.length != 3) {
	require('./usage').output();
} else if (args[2].endsWith('.js') || args[2].endsWith(".json")) {
	console.log("[PROJECT FILE PROTECTION]");
	console.log("Output filename cannot end with .js or .json");
} else {
	const session = new Session(...args);
	session.start();
}
