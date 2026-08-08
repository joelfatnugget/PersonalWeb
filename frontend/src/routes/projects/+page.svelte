<script lang="ts">
    import { projects, type Project } from '$lib/data';
    import { filterProjects } from '$lib/utils';
    import Icon from '@iconify/svelte';
    import { ExternalLink, ArrowUpRight, Search, X, Sparkles, Layers } from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let category = $state('All');
    let searchQuery = $state('');
    let selectedProject = $state<Project | null>(null);

    const categories = ['All', 'Python', 'React', 'Docker', 'Next.js', 'Payments', 'TypeScript'];

    let filtered = $derived(filterProjects(projects, searchQuery, category));
</script>

<div class="container mx-auto px-4 py-12 md:py-20 max-w-7xl relative z-10">
    
    <!-- Header -->
    <header class="mb-16 text-center space-y-4 max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest border border-primary-500/20">
            <Layers class="size-3.5" /> Bento Gallery
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-surface-900 dark:text-white">
            Selected Work & Projects
        </h1>
        <p class="text-surface-600 dark:text-surface-300 text-lg">
            An interactive showcase of microservices, GenAI tools, payment industry deep-dives, and public tech applications.
        </p>

        <!-- Search Bar & Filter Chips -->
        <div class="pt-6 space-y-4">
            <!-- Search Bar -->
            <div class="relative max-w-md mx-auto">
                <Search class="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-surface-400" />
                <input 
                    type="text" 
                    placeholder="Search projects by tech, keyword, or title..." 
                    bind:value={searchQuery}
                    class="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm shadow-sm transition-all text-surface-900 dark:text-white"
                />
                {#if searchQuery}
                    <button 
                        onclick={() => searchQuery = ''}
                        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-surface-400 hover:text-surface-700 dark:hover:text-surface-200"
                    >
                        <X class="size-4" />
                    </button>
                {/if}
            </div>

            <!-- Filter Chips -->
            <div class="flex flex-wrap justify-center gap-2">
                {#each categories as cat}
                    <button 
                        class="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border cursor-pointer
                        {category === cat 
                            ? 'bg-primary-600 text-white border-primary-600 shadow-md scale-105' 
                            : 'bg-white/80 dark:bg-surface-900/80 border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-300 hover:border-primary-500 hover:text-surface-900 dark:hover:text-white'}" 
                        onclick={() => category = cat}
                    >
                        {cat}
                    </button>
                {/each}
            </div>
        </div>
    </header>

    <!-- Perfectly Balanced Bento Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-flow-row-dense items-stretch">
        {#each filtered as project, i (project.id)}
            {@const isFeatured = project.featured && searchQuery === '' && category === 'All'}
            <div 
                class="group relative flex flex-col bg-white dark:bg-surface-900/90 backdrop-blur-md border border-surface-200/80 dark:border-surface-800 rounded-3xl overflow-hidden hover:border-primary-500/60 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 cursor-pointer h-full justify-between
                {isFeatured ? 'md:col-span-2' : ''}"
                in:fly={{ y: 30, duration: 500, delay: i * 70, easing: cubicOut }}
                onclick={() => selectedProject = project}
                role="button"
                tabindex="0"
            >
                <!-- Image Header Area -->
                <div class="relative w-full aspect-video bg-surface-950 overflow-hidden border-b border-surface-100 dark:border-surface-800 flex-shrink-0">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        class="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    <!-- Dark Overlay with Action Buttons -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-start justify-between p-4">
                        {#if project.featured}
                            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                                <Sparkles class="size-3" /> Featured Project
                            </span>
                        {:else}
                            <div></div>
                        {/if}

                        <div class="flex items-center gap-2" onclick={(e) => e.stopPropagation()}>
                            {#if project.github}
                                <a 
                                    href={project.github} 
                                    target="_blank" 
                                    class="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-primary-600 transition-colors shadow-md border border-white/10" 
                                    title="View Source Code"
                                >
                                    <Icon icon="simple-icons:github" class="text-base" />
                                </a>
                            {/if}
                            {#if project.link}
                                <a 
                                    href={project.link} 
                                    target="_blank" 
                                    class="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-primary-600 transition-colors shadow-md border border-white/10" 
                                    title="Live Demo"
                                >
                                    <ExternalLink class="size-4" />
                                </a>
                            {/if}
                        </div>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="p-6 sm:p-8 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                        <h3 class="text-2xl font-extrabold text-surface-900 dark:text-white tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {project.title}
                        </h3>
                        <p class="text-surface-600 dark:text-surface-300 text-sm leading-relaxed mt-2 line-clamp-3">
                            {project.description}
                        </p>
                    </div>

                    <!-- Tech Tags (Bottom Sticky) -->
                    <div class="pt-4 border-t border-surface-100 dark:border-surface-800 flex flex-wrap gap-2 items-center justify-between mt-auto">
                        <div class="flex flex-wrap gap-1.5">
                            {#each project.tags as tag}
                                <span class="px-2.5 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-xs font-semibold border border-surface-200 dark:border-surface-700">
                                    {tag}
                                </span>
                            {/each}
                        </div>

                        <span class="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
                            Details <ArrowUpRight class="size-3.5" />
                        </span>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    {#if filtered.length === 0}
        <div class="text-center py-20 space-y-4" in:fade>
            <p class="text-surface-500 text-lg">No projects match your filter criteria.</p>
            <button 
                onclick={() => { category = 'All'; searchQuery = ''; }}
                class="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors shadow-md"
            >
                Reset Filters
            </button>
        </div>
    {/if}
</div>

<!-- Detailed Project Modal -->
{#if selectedProject}
    <div 
        class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        onclick={() => selectedProject = null}
        role="button"
        tabindex="-1"
    >
        <div 
            class="bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onclick={(e) => e.stopPropagation()}
            role="document"
        >
            <!-- Close Button -->
            <button 
                onclick={() => selectedProject = null}
                class="absolute top-6 right-6 p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300 transition-colors"
                aria-label="Close modal"
            >
                <X class="size-5" />
            </button>

            <!-- Modal Preview Image -->
            <div class="rounded-2xl overflow-hidden aspect-video bg-surface-950 border border-surface-200 dark:border-surface-800">
                <img src={selectedProject.image} alt={selectedProject.title} class="w-full h-full object-cover object-top" />
            </div>

            <!-- Content -->
            <div class="space-y-4">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white">
                    {selectedProject.title}
                </h2>
                
                <p class="text-surface-700 dark:text-surface-300 leading-relaxed text-base">
                    {selectedProject.description}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 pt-2">
                    {#each selectedProject.tags as tag}
                        <span class="px-3 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-xs font-semibold text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700">
                            {tag}
                        </span>
                    {/each}
                </div>

                <!-- Action Links -->
                <div class="flex flex-wrap gap-4 pt-4 border-t border-surface-200 dark:border-surface-800">
                    {#if selectedProject.github}
                        <a 
                            href={selectedProject.github} 
                            target="_blank" 
                            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-900 dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
                        >
                            <Icon icon="simple-icons:github" class="text-lg" />
                            View Source Code
                        </a>
                    {/if}
                    {#if selectedProject.link}
                        <a 
                            href={selectedProject.link} 
                            target="_blank" 
                            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-colors shadow-md"
                        >
                            Live Demo <ExternalLink class="size-4" />
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}