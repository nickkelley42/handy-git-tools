#!/usr/bin/env node

const command_wrapper = require('./command_wrapper');


async function main() {
	let branches = await command_wrapper('git branch');
	console.log(branches);
}
