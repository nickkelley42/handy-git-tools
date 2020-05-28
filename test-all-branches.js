#!/usr/bin/env node

const command_wrapper = require('./command_wrapper');

async function get_branch_names() {
	let branches = await command_wrapper('git branch --format %(refname:short)');
	branches = branches.stdout.split('\n').filter(name => name.length > 0);
	return branches;
}

async function main() {
	let branches = await get_branch_names();
	let failed_branches = await Promise.all(branches.map(async branch => {
		await command_wrapper(`git checkout ${branch}`);
		let result = await command_wrapper('npm test');
		if (result.code !== 0) {
			return branch;
		} else {
			return false;
		}
	}).filter(res => res));

	if (failed_branches.length > 0) {
		console.log('Failing branches:');
		failed_branches.forEach(b => console.log(`* ${b}`));
	} else {
		console.log('All local branches passed test.');
	}
}

main();
