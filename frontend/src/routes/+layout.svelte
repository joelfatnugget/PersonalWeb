<script lang="ts">
    import '../app.css';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Dock from '$lib/components/Dock.svelte';
    import favicon from '$lib/assets/favicon.svg';

    let { children } = $props();
    let prefersReducedMotion = $state(false);

    onMount(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            prefersReducedMotion = mediaQuery.matches;
            const listener = (e: MediaQueryListEvent) => {
                prefersReducedMotion = e.matches;
            };
            mediaQuery.addEventListener('change', listener);
            return () => mediaQuery.removeEventListener('change', listener);
        }
    });
</script>

<svelte:head>
    <title>Joel Tan | Building Digital Excellence</title>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="no-print">
    <Navbar />
</div>

<!-- Main Content Area with Reduced Motion Guard -->
<main class="min-h-screen pt-20 pb-24 md:pb-16 md:pl-24 lg:pl-28 md:pr-4 overflow-x-hidden">
    {#key $page.url.pathname}
        <div 
            in:fly={prefersReducedMotion ? { duration: 0 } : { y: 20, duration: 400, delay: 100, easing: cubicOut }} 
            class="w-full h-full"
        >
            {@render children()}
        </div>
    {/key}
</main>

<div class="no-print md:pl-24 lg:pl-28 md:pr-4">
    <Footer />
</div>

<div class="no-print">
    <Dock />
</div>
