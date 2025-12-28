import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/skeleton/plugin';
import flowbitePlugin from 'flowbite/plugin';

// Note: Ensure you have a theme setup for Skeleton. 
// We are using the default 'skeleton' preset here.

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// Skeleton
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		),
		// Flowbite
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				// Shadcn usually adds colors here, we can add them later via CSS variables
			}
		},
	},
	plugins: [
		skeleton({
			themes: { preset: [ "skeleton" ] }
		}),
		flowbitePlugin
	]
} satisfies Config;
