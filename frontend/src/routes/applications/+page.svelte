<script lang="ts">
    import { 
        FileCode2, 
        ArrowRight, 
        Cpu, 
        CheckCircle2, 
        Search
    } from 'lucide-svelte';
    import { fly } from 'svelte/transition';

    let searchQuery = '';
    let selectedCategory = 'All';

    const categories = ['All', 'Mainframe & Banking'];

    const applications = [
        {
            id: 'tlv-parser',
            title: 'IBM Character Set TLV Parser',
            subtitle: 'BER-TLV Inspector & Mainframe EBCDIC Translator',
            description: 'Parse complex TLV structures, inspect nested tag hierarchies, select specialized IBM Code Pages (IBM037, IBM500, IBM1047, etc.), and perform bidirectional Hex &lt;-&gt; Raw Literal conversions.',
            icon: FileCode2,
            path: '/applications/tlv-parser',
            status: 'Live App',
            isLive: true,
            category: 'Mainframe & Banking',
            badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
            tags: ['IBM EBCDIC', 'BER-TLV', 'EMV ISO-7816', 'Mainframe']
        }
    ];

    $: filteredApps = applications.filter(app => {
        const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
        const matchesQuery = searchQuery === '' || 
            app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesQuery;
    });
</script>

<svelte:head>
    <title>Application Portal & Developer Suite | Personal Portfolio</title>
    <meta name="description" content="Showcase of interactive developer utilities, mainframe tools, and data parsing applications including IBM Character Set TLV Parser." />
</svelte:head>

<div class="relative min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Background Gradient Mesh -->
    <div class="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px]"></div>
    </div>

    <!-- Header Section -->
    <div class="text-center max-w-3xl mx-auto mb-12" in:fly={{ y: 20, duration: 800 }}>
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 text-xs font-mono mb-4">
            <Cpu class="size-3.5" />
            <span>Developer Applications Showcase Suite</span>
        </div>
        <h1 class="h1 font-black mb-4 tracking-tighter">
            Application <span class="text-primary-500">Showcase Hub</span>
        </h1>
        <p class="text-lg text-surface-600 dark:text-surface-300 font-medium">
            Explore interactive developer utilities, mainframe translation tools, and financial protocol parsers built for performance.
        </p>
    </div>

    <!-- Search & Filter Controls -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center gap-2">
            {#each categories as cat}
                <button 
                    class="px-4 py-2 rounded-xl text-xs font-medium transition-all {selectedCategory === cat ? 'bg-primary-500 text-white shadow-md' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'}"
                    on:click={() => selectedCategory = cat}
                >
                    {cat}
                </button>
            {/each}
        </div>

        <!-- Search Bar -->
        <div class="relative w-full md:w-72">
            <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-surface-400" />
            <input 
                type="text"
                bind:value={searchQuery}
                placeholder="Search applications..."
                class="w-full bg-surface-100/80 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
        </div>
    </div>

    <!-- Applications Showcase Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredApps as app, i}
            <div 
                in:fly={{ y: 30, duration: 800, delay: i * 100 }}
                class="group relative rounded-3xl bg-surface-100/80 dark:bg-surface-800/60 backdrop-blur-xl border border-surface-200 dark:border-surface-700/80 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="p-3.5 rounded-2xl bg-primary-500/10 text-primary-500 border border-primary-500/20 group-hover:scale-110 transition-transform">
                            <svelte:component this={app.icon} class="size-7" />
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 {app.badgeColor}">
                            <CheckCircle2 class="size-3.5" />
                            {app.status}
                        </span>
                    </div>

                    <div>
                        <h2 class="text-xl font-bold text-surface-900 dark:text-surface-100 group-hover:text-primary-500 transition-colors">
                            {app.title}
                        </h2>
                        <p class="text-xs font-mono text-primary-600 dark:text-primary-400 font-semibold mt-1">
                            {app.subtitle}
                        </p>
                    </div>

                    <p class="text-sm text-surface-600 dark:text-surface-300 line-clamp-3">
                        {@html app.description}
                    </p>

                    <div class="flex flex-wrap gap-1.5 pt-2">
                        {#each app.tags as tag}
                            <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-surface-200/60 dark:bg-surface-700/60 text-surface-600 dark:text-surface-400">
                                {tag}
                            </span>
                        {/each}
                    </div>
                </div>

                <div class="pt-6 mt-4 border-t border-surface-200/60 dark:border-surface-700/50">
                    <a 
                        href={app.path} 
                        class="btn variant-filled-primary w-full group/btn font-semibold text-sm rounded-xl py-2.5 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
                    >
                        <span>Launch Application</span>
                        <ArrowRight class="size-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                </div>
            </div>
        {/each}
    </div>
</div>
