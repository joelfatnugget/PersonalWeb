<script lang="ts">
    import { projects } from '$lib/data';
    import Icon from '@iconify/svelte';
    import { ExternalLink, Github, ArrowUpRight } from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let filter = $state('All');
    const categories = ['All', 'React', 'Node.js', 'Rust', 'Python', 'Payments'];

    // Filter logic
    let filteredProjects = $derived(
        filter === 'All' 
        ? projects 
        : projects.filter(p => p.tags.some(t => t.includes(filter)))
    );
</script>

<div class="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
    
    <!-- Header -->
    <header class="mb-16 text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight">Selected Work</h1>
        <p class="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto text-lg">
            A curated collection of projects exploring web development, fintech, and enterprise solutions.
        </p>

        <!-- Filter Chips (Glass Style) -->
        <div class="flex flex-wrap justify-center gap-3 pt-8">
            {#each categories as cat}
                <button 
                    class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                    {filter === cat 
                        ? 'bg-surface-900 text-white border-surface-900 dark:bg-white dark:text-black dark:border-white shadow-lg scale-105' 
                        : 'bg-transparent border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-surface-500 hover:text-surface-900 dark:hover:text-white'}" 
                    onclick={() => filter = cat}
                >
                    {cat}
                </button>
            {/each}
        </div>
    </header>

    <!-- Project Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredProjects as project, i (project.id)}
            <div 
                class="group flex flex-col bg-white dark:bg-surface-900/50 backdrop-blur-sm border border-surface-200 dark:border-surface-800 rounded-2xl overflow-hidden hover:border-surface-300 dark:hover:border-surface-600 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500"
                in:fly={{ y: 30, duration: 600, delay: i * 100, easing: cubicOut }}
            >
                <!-- Image Area (Clickable) -->
                <a 
                    href={project.github || project.link}
                    target="_blank" 
                    class="relative aspect-video overflow-hidden bg-surface-100 dark:bg-surface-800"
                >
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    <!-- Overlay with Action Button -->
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span class="inline-flex items-center gap-2 px-6 py-3 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Project <ArrowUpRight class="size-4" />
                        </span>
                    </div>
                </a>

                <!-- Content Area -->
                <div class="p-6 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-xl font-bold tracking-tight group-hover:text-primary-500 transition-colors">
                            {project.title}
                        </h3>
                        
                        <div class="flex gap-2">
                            {#if project.github}
                                <a href={project.github} target="_blank" class="text-surface-400 hover:text-surface-900 dark:hover:text-white transition-colors" aria-label="GitHub">
                                    <Icon icon="mdi:github" class="text-xl" />
                                </a>
                            {/if}
                            {#if project.link}
                                <a href={project.link} target="_blank" class="text-surface-400 hover:text-primary-500 transition-colors" aria-label="Live Demo">
                                    <ExternalLink class="size-5" />
                                </a>
                            {/if}
                        </div>
                    </div>

                    <p class="text-surface-600 dark:text-surface-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                    </p>

                    <!-- Tags (Bottom) -->
                    <div class="mt-auto flex flex-wrap gap-2 pt-4 border-t border-surface-100 dark:border-surface-800/50">
                        {#each project.tags as tag}
                            <span class="px-2.5 py-1 rounded-md bg-surface-100 dark:bg-surface-800 text-xs font-semibold text-surface-600 dark:text-surface-300">
                                {tag}
                            </span>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>

    {#if filteredProjects.length === 0}
        <div class="text-center py-20 text-surface-500" in:fade>
            <p>No projects found in this category.</p>
        </div>
    {/if}
</div>