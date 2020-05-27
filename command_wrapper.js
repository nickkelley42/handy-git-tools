const { exec } = require('child_process');

module.exports = function commandWrapper(command) {
	return new Promise((resolve, reject) => {
		exec(command, {}, (error, stdout, stderr) => {
			if (error) return reject(error);
			resolve(stdout);
		});
	});
};
