import { defineCommand, runMain } from 'citty'
import { initCommand } from './commands/init'
import { addCommand } from './commands/add'

const init = defineCommand({
	meta: {
		name: 'init',
		description: 'Initialize Quant UI in an existing Vue 3 project',
	},
	run: async () => {
		await initCommand()
	},
})

const add = defineCommand({
	meta: {
		name: 'add',
		description: 'Add components to the project',
	},
	args: {
		force: {
			type: 'boolean',
			default: false,
			alias: 'f',
			description: 'Overwrite existing files without confirmation',
		},
	},
	run: async (ctx) => {
		const args = (ctx as { rawArgs?: string[]; args?: { force?: boolean } }).rawArgs ?? []
		const components = args.filter((arg) => !arg.startsWith('-') && arg !== 'add')
		await addCommand({
			components,
			force: Boolean((ctx as { args?: { force?: boolean } }).args?.force),
		})
	},
})

const main = defineCommand({
	meta: {
		name: 'quant-ui',
		version: '0.1.0',
		description: 'Quant UI CLI',
	},
	subCommands: {
		init,
		add,
	},
})

runMain(main)
