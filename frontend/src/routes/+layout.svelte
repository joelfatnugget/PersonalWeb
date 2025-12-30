<script lang="ts">
	import '../app.css';
    import { page } from '$app/stores';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    // import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Dock from '$lib/components/Dock.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Joel Tan | Building Digital Excellence</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- AppShell handles the main layout structure (Header, Content, Footer) -->
<!-- <AppShell>
    {#snippet header()}
        <Navbar />
    {/snippet} -->

    <div class="no-print">
        <Navbar />
    </div>

    <!-- Main Content Area with Transitions -->
    <main class="min-h-screen pt-20 pb-24 overflow-x-hidden"> <!-- Added overflow-x-hidden -->
        {#key $page.url.pathname}
            <div 
                in:fly={{ y: 20, duration: 400, delay: 100, easing: cubicOut }} 
                class="w-full h-full"
            >
                {@render children()}
            </div>
        {/key}
    </main>
    
    <div class="no-print">
        <Footer />
    </div>
<!-- 
    {#snippet footer()}
        <Footer />
    {/snippet}
    
    <Dock />
</AppShell> -->
<div class="no-print">
    <Dock />
</div>
