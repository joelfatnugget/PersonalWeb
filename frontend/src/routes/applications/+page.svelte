<script lang="ts">
    import { 
        ArrowRight, 
        Cpu, 
        CheckCircle2, 
        Search,
        Clock,
        Binary,
        Layers,
        Grid,
        ExternalLink,
        RefreshCw,
        X
    } from 'lucide-svelte';
    import { fly } from 'svelte/transition';
    import { developerApplications } from '$lib/data';
    import { filterDeveloperApplications } from '$lib/utils';

    let searchQuery = $state('');
    let selectedCategory = $state('All');

    const categories = ['All', 'Mainframe & Banking', 'Payments & Protocols'];

    let filteredApps = $derived(filterDeveloperApplications(developerApplications, searchQuery, selectedCategory));
    let featuredApp = $derived(filteredApps.find(app => app.featured));
    let otherApps = $derived(filteredApps.filter(app => !app.featured));

    function resetFilters() {
        searchQuery = '';
        selectedCategory = 'All';
    }
</script>

<svelte:head>
    <title>Application Showcase Hub | Personal Portfolio</title>
    <meta name="description" content="Showcase of interactive developer utilities, mainframe tools, and payment protocol parsers including IBM Character Set TLV Parser." />
</svelte:head>

<div class="relative min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
    <!-- Background Gradient Mesh -->
    <div class="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px]"></div>
    </div>

    <!-- Header Section -->
    <div class="text-center max-w-3xl mx-auto mb-10" in:fly={{ y: 20, duration: 800 }}>
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 text-xs font-mono mb-4">
            <Cpu class="size-3.5" />
            <span>Developer Applications Showcase Suite</span>
        </div>
        <h1 class="h1 font-black mb-4 tracking-tighter text-4xl sm:text-5xl text-surface-900 dark:text-white">
            Application <span class="text-primary-500">Showcase Hub</span>
        </h1>
        <p class="text-lg text-surface-600 dark:text-surface-300 font-medium">
            Explore interactive developer utilities, mainframe translation tools, and financial protocol parsers built for performance.
        </p>
    </div>

    <!-- Search & Filter Controls -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center gap-2">
            {#each categories as cat}
                <button 
                    type="button"
                    class="px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer {selectedCategory === cat ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'}"
                    onclick={() => selectedCategory = cat}
                >
                    {cat}
                </button>
            {/each}
        </div>

        <!-- Search Bar -->
        <div class="relative w-full sm:w-72">
            <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-surface-400" />
            <input 
                type="text"
                bind:value={searchQuery}
                placeholder="Search applications..."
                aria-label="Search applications"
                class="w-full bg-surface-100/80 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 rounded-xl pl-10 pr-9 py-2 text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:outline-none text-surface-900 dark:text-surface-100 placeholder:text-surface-400"
            />
            {#if searchQuery}
                <button
                    type="button"
                    class="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 cursor-pointer"
                    onclick={() => searchQuery = ''}
                    aria-label="Clear search"
                >
                    <X class="size-3.5" />
                </button>
            {/if}
        </div>
    </div>

    <!-- Flagship Application Featured Showcase -->
    {#if featuredApp}
        <div 
            in:fly={{ y: 25, duration: 600 }}
            class="group relative rounded-3xl bg-surface-100/90 dark:bg-surface-800/70 backdrop-blur-xl border border-surface-200/90 dark:border-surface-700/80 p-6 md:p-8 shadow-2xl transition-all mb-10 overflow-hidden"
        >
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <!-- Left Details Column (7 cols) -->
                <div class="lg:col-span-7 space-y-4">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 {featuredApp.badgeColor}">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            {featuredApp.status}
                        </span>
                        <span class="px-3 py-1 rounded-full text-xs font-mono bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                            {featuredApp.category}
                        </span>
                    </div>

                    <div>
                        <h2 class="text-2xl md:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
                            {featuredApp.title}
                        </h2>
                        <p class="text-xs md:text-sm font-mono text-primary-600 dark:text-primary-400 font-semibold mt-1">
                            {featuredApp.subtitle}
                        </p>
                    </div>

                    <p class="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
                        {featuredApp.description}
                    </p>

                    <!-- Key Capabilities Checklist -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {#each featuredApp.capabilities as cap}
                            <div class="flex items-center gap-2 text-xs text-surface-700 dark:text-surface-300">
                                <CheckCircle2 class="size-3.5 text-primary-500 shrink-0" />
                                <span>{cap}</span>
                            </div>
                        {/each}
                    </div>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-1.5 pt-2">
                        {#each featuredApp.tags as tag}
                            <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-surface-200/60 dark:bg-surface-700/60 text-surface-600 dark:text-surface-400">
                                {tag}
                            </span>
                        {/each}
                    </div>

                    <!-- Actions -->
                    <div class="pt-4 flex flex-wrap items-center gap-3">
                        <a 
                            href={featuredApp.path} 
                            class="group/btn font-semibold text-sm rounded-xl py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                        >
                            <span>Launch Interactive Application</span>
                            <ArrowRight class="size-4 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                        <a 
                            href="{featuredApp.path}" 
                            class="font-mono text-xs rounded-xl py-3 px-4 border border-surface-200 dark:border-surface-700 hover:bg-surface-200/50 dark:hover:bg-surface-700/50 text-surface-600 dark:text-surface-300 transition-colors flex items-center gap-1.5"
                        >
                            <Grid class="size-3.5 text-primary-500" />
                            <span>Hex Matrix</span>
                        </a>
                        <a 
                            href="{featuredApp.path}" 
                            class="font-mono text-xs rounded-xl py-3 px-4 border border-surface-200 dark:border-surface-700 hover:bg-surface-200/50 dark:hover:bg-surface-700/50 text-surface-600 dark:text-surface-300 transition-colors flex items-center gap-1.5"
                        >
                            <Binary class="size-3.5 text-primary-500" />
                            <span>EBCDIC Converter</span>
                        </a>
                    </div>
                </div>

                <!-- Right Interactive Preview Terminal Mockup (5 cols) -->
                {#if featuredApp.previewSnippet}
                    <div class="lg:col-span-5">
                        <div class="rounded-2xl bg-surface-950 text-surface-100 p-5 border border-surface-800 shadow-2xl font-mono text-xs space-y-4">
                            <!-- Terminal Header Bar -->
                            <div class="flex items-center justify-between pb-3 border-b border-surface-800 text-[11px] text-surface-400">
                                <div class="flex items-center gap-1.5">
                                    <div class="size-2.5 rounded-full bg-red-500/80"></div>
                                    <div class="size-2.5 rounded-full bg-yellow-500/80"></div>
                                    <div class="size-2.5 rounded-full bg-green-500/80"></div>
                                </div>
                                <span class="truncate max-w-[200px] text-surface-300">{featuredApp.previewSnippet.title}</span>
                                <span class="text-[10px] px-1.5 py-0.5 rounded bg-surface-800 text-surface-400">DEMO</span>
                            </div>

                            <!-- Hex Payload Snippet -->
                            <div class="space-y-1.5">
                                <div class="text-[10px] uppercase tracking-wider text-surface-400 flex items-center justify-between">
                                    <span>{featuredApp.previewSnippet.inputLabel}</span>
                                    <span class="text-primary-400 font-bold">38 BYTES</span>
                                </div>
                                <div class="p-2.5 rounded-xl bg-surface-900 border border-surface-800/80 font-mono text-[11px] text-emerald-400 break-all leading-relaxed select-all">
                                    {featuredApp.previewSnippet.inputValue}
                                </div>
                            </div>

                            <!-- Decoded Tree Structure Preview -->
                            <div class="space-y-2 pt-1">
                                <div class="text-[10px] uppercase tracking-wider text-surface-400">
                                    Decoded Node Hierarchy
                                </div>
                                <div class="space-y-1.5">
                                    {#each featuredApp.previewSnippet.outputRows as row}
                                        <div class="flex items-start justify-between gap-2 p-2 rounded-lg bg-surface-900/80 border border-surface-800/50">
                                            <div class="flex items-center gap-1.5">
                                                {#if row.tag}
                                                    <span class="px-1.5 py-0.5 rounded bg-primary-500/20 text-primary-400 text-[10px] font-bold">
                                                        Tag {row.tag}
                                                    </span>
                                                {/if}
                                                <span class="text-[11px] text-surface-300 font-semibold">{row.label}</span>
                                            </div>
                                            <span class="text-[11px] text-surface-400 font-mono text-right">{row.value}</span>
                                        </div>
                                    {/each}
                                </div>
                            </div>

                            <div class="pt-2 text-center">
                                <a 
                                    href={featuredApp.path} 
                                    class="text-[11px] text-primary-400 hover:text-primary-300 inline-flex items-center gap-1 transition-colors"
                                >
                                    <span>Inspect full payload in live sandbox</span>
                                    <ExternalLink class="size-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    {/if}

    <!-- Secondary / Roadmap Applications Grid -->
    {#if otherApps.length > 0}
        <div class="space-y-6 pt-2">
            <div class="flex items-center gap-2 pb-2 border-b border-surface-200 dark:border-surface-800">
                <Layers class="size-4 text-primary-500" />
                <h3 class="text-lg font-bold text-surface-900 dark:text-white">
                    Protocol Tools & Engineering Pipeline
                </h3>
                <span class="text-xs text-surface-500 font-mono">({otherApps.length} upcoming)</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {#each otherApps as app, i}
                    <div 
                        in:fly={{ y: 20, duration: 600, delay: i * 80 }}
                        class="rounded-3xl bg-surface-100/70 dark:bg-surface-800/50 backdrop-blur-md border border-surface-200/80 dark:border-surface-700/60 p-6 flex flex-col justify-between hover:border-surface-300 dark:hover:border-surface-600 transition-all space-y-4 shadow-lg"
                    >
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 {app.badgeColor}">
                                    <Clock class="size-3.5" />
                                    {app.status}
                                </span>
                                <span class="text-xs font-mono text-surface-500">
                                    {app.category}
                                </span>
                            </div>

                            <div>
                                <h4 class="text-lg font-bold text-surface-900 dark:text-surface-100">
                                    {app.title}
                                </h4>
                                <p class="text-xs font-mono text-primary-600 dark:text-primary-400 mt-0.5">
                                    {app.subtitle}
                                </p>
                            </div>

                            <p class="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
                                {app.description}
                            </p>

                            <div class="space-y-1.5 pt-1">
                                {#each app.capabilities as cap}
                                    <div class="flex items-center gap-2 text-xs text-surface-600 dark:text-surface-400">
                                        <span class="size-1.5 rounded-full bg-primary-500 shrink-0"></span>
                                        <span>{cap}</span>
                                    </div>
                                {/each}
                            </div>
                        </div>

                        <div class="pt-4 border-t border-surface-200/60 dark:border-surface-700/50 flex items-center justify-between">
                            <div class="flex flex-wrap gap-1.5">
                                {#each app.tags as tag}
                                    <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-200/60 dark:bg-surface-700/60 text-surface-600 dark:text-surface-400">
                                        {tag}
                                    </span>
                                {/each}
                            </div>
                            <span class="text-xs font-mono text-surface-400 italic">
                                Roadmap
                            </span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Empty State -->
    {#if filteredApps.length === 0}
        <div 
            in:fly={{ y: 20, duration: 500 }}
            class="text-center py-16 px-4 rounded-3xl bg-surface-100/50 dark:bg-surface-800/40 border border-dashed border-surface-300 dark:border-surface-700"
        >
            <div class="size-12 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center mx-auto mb-4">
                <Search class="size-6" />
            </div>
            <h3 class="text-lg font-bold text-surface-900 dark:text-white mb-2">
                No applications found
            </h3>
            <p class="text-sm text-surface-600 dark:text-surface-400 max-w-md mx-auto mb-6">
                {#if searchQuery}
                    We couldn't find any developer tools matching "<span class="font-semibold text-primary-500">{searchQuery}</span>" in category "{selectedCategory}".
                {:else}
                    No applications found in the selected category.
                {/if}
            </p>
            <button 
                type="button"
                class="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md shadow-primary-500/20"
                onclick={resetFilters}
            >
                <RefreshCw class="size-3.5" />
                <span>Reset Filters & Search</span>
            </button>
        </div>
    {/if}
</div>
