<script lang="ts">
	import '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/themes/wintry.css';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
