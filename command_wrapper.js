const { spawn } = require('child_process');

module.exports = function command_wrapper(command) {
	let command_array = command.split(' ');
	let bin = command_array.shift();
	let args = command_array;
	let process = spawn(bin, args);

	let stdout = '';
	process.stdout.on('data', data => stdout += data);

	return new Promise((resolve, reject) => {
		process.on('exit', code => {
			resolve({
				code,
				stdout
			});
		});
	});
};
