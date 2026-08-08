<script lang="ts">
    import { experiences, skills } from '$lib/data';
    import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import { tilt } from '$lib/actions/tilt';
    import { formatDate, highlightImpact } from '$lib/utils';
    import Icon from '@iconify/svelte';

    // State for cross-card skill highlighting
    let hoveredSkill = $state<string | null>(null);
    let activeHash = $state<string>('');

    // Helper: Find icon for skill
    function getSkillIcon(name: string): string | undefined {
        return skills.find(s => s.name.toLowerCase() === name.toLowerCase())?.icon;
    }

    // Intersection observer reveal
    function reveal(node: HTMLElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    node.classList.add('active');
                    observer.unobserve(node);
                }
            });
        }, { threshold: 0.05 });

        observer.observe(node);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            activeHash = window.location.hash.replace('#', '');
            if (activeHash) {
                const target = document.getElementById(activeHash);
                if (target) {
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }
            }
        }
    });
</script>

<div class="relative min-h-screen pt-12 pb-24 overflow-x-hidden">
    <!-- Ambient Background Mesh -->
    <div class="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_28px]">
        <div class="absolute right-10 top-20 -z-10 h-[350px] w-[350px] rounded-full bg-primary-500/15 blur-[120px]"></div>
        <div class="absolute left-10 bottom-20 -z-10 h-[350px] w-[350px] rounded-full bg-tertiary-500/15 blur-[120px]"></div>
    </div>

    <div class="container mx-auto px-4 max-w-5xl relative z-10">
        
        <!-- Header -->
        <header class="mb-16 text-center space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest border border-primary-500/20">
                <Sparkles class="size-3.5" /> Career Journey
            </div>
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-surface-900 dark:text-white">
                Professional Experience
            </h1>
            <p class="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
                Architecting high-scale enterprise software, GenAI automation pipelines, and native mobile apps.
            </p>

            <!-- Skill Filter Legend -->
            {#if hoveredSkill}
                <div class="pt-2 animate-in fade-in duration-200">
                    <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-500 text-white font-medium text-xs shadow-md">
                        Highlighting experience using "{hoveredSkill}"
                    </span>
                </div>
            {/if}
        </header>

        <!-- Timeline Container -->
        <div class="relative space-y-16">
            <!-- Vertical Line -->
            <div class="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-surface-200 dark:bg-surface-800 -translate-x-1/2"></div>

            {#each experiences as job, i (job.id)}
                {@const isHighlighted = activeHash === job.id}
                {@const matchesHoveredSkill = hoveredSkill !== null && job.skills.some(s => s.toLowerCase() === hoveredSkill?.toLowerCase())}
                
                <div 
                    use:reveal 
                    id={job.id}
                    class="reveal-item relative flex flex-col md:flex-row gap-8 items-start group"
                    class:md:flex-row-reverse={i % 2 !== 0}
                >
                    <!-- Timeline Node Indicator -->
                    <div 
                        class="absolute left-6 md:left-1/2 w-5 h-5 rounded-full border-4 border-white dark:border-surface-950 -translate-x-1/2 mt-6 z-20 transition-all duration-300 shadow-md group-hover:scale-150 {matchesHoveredSkill ? 'scale-150 ring-4 ring-primary-500/50' : ''}"
                        style="background-color: {job.color || 'var(--color-primary-500)'}"
                    ></div>

                    <!-- Date Column (Desktop) -->
                    <div class="hidden md:block w-1/2 text-right pt-5 px-8" class:text-left={i % 2 !== 0} class:text-right={i % 2 === 0}>
                        <span 
                            class="font-mono text-sm font-bold tracking-widest px-3 py-1 rounded-full bg-surface-100 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 shadow-xs inline-block"
                            style="color: {job.color || 'var(--color-primary-500)'}"
                        >
                            {formatDate(job.startDate)} — {formatDate(job.endDate)}
                        </span>
                    </div>

                    <!-- Experience Card Column -->
                    <div class="w-full md:w-1/2 pl-14 md:pl-0">
                        <!-- Mobile Date -->
                        <div class="md:hidden font-mono text-xs font-bold tracking-wider mb-3">
                            <span 
                                class="px-2.5 py-1 rounded-full bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700"
                                style="color: {job.color || 'var(--color-primary-500)'}"
                            >
                                {formatDate(job.startDate)} — {formatDate(job.endDate)}
                            </span>
                        </div>
                        
                        <div 
                            use:tilt={{ max: 3, scale: 1.01 }}
                            class="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-surface-900/90 backdrop-blur-md border border-surface-200/80 dark:border-surface-800 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group/card
                            {isHighlighted ? 'ring-2 ring-primary-500 shadow-primary-500/20' : ''}
                            {matchesHoveredSkill ? 'border-primary-500 dark:border-primary-400 ring-1 ring-primary-500/30' : ''}"
                            style="border-left: 5px solid {job.color || '#3b82f6'};"
                        >
                            <!-- Watermark Logo -->
                            {#if job.logo}
                                <img 
                                    src={job.logo} 
                                    alt="" 
                                    class="absolute -right-8 -bottom-8 w-40 h-40 opacity-[0.04] dark:opacity-[0.06] grayscale rotate-12 pointer-events-none z-0"
                                />
                            {/if}

                            <header class="mb-5 relative z-10 flex justify-between items-start gap-4">
                                <div>
                                    <h3 class="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white tracking-tight group-hover/card:text-primary-600 dark:group-hover/card:text-primary-400 transition-colors">
                                        {job.role}
                                    </h3>
                                    <div class="flex flex-wrap items-center gap-2 text-surface-600 dark:text-surface-300 text-sm mt-1">
                                        <div class="flex items-center gap-1.5 font-semibold text-surface-800 dark:text-surface-200">
                                            <Briefcase class="size-4 text-primary-500" />
                                            <span>{job.company}</span>
                                        </div>
                                        <span>•</span>
                                        <div class="flex items-center gap-1">
                                            <MapPin class="size-3.5 text-surface-400" />
                                            <span>{job.location}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {#if job.logo}
                                    <div class="bg-white p-2 rounded-xl shadow-sm border border-surface-200/80 dark:border-surface-700 flex-shrink-0">
                                        <img src={job.logo} alt="{job.company} Logo" class="w-10 h-10 object-contain" />
                                    </div>
                                {/if}
                            </header>

                            <!-- Bullet Points -->
                            <ul class="space-y-3 text-surface-700 dark:text-surface-300 text-sm sm:text-base leading-relaxed mb-6 relative z-10">
                                {#each job.description as item}
                                    <li class="flex items-start gap-2.5">
                                        <span class="size-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                                        <span>{@html highlightImpact(item)}</span>
                                    </li>
                                {/each}
                            </ul>

                            <!-- Skill Badges with Cross-Highlighting -->
                            <footer class="flex flex-wrap gap-2 relative z-10 pt-4 border-t border-surface-100 dark:border-surface-800">
                                {#each job.skills as skill}
                                    {@const icon = getSkillIcon(skill)}
                                    {@const isCurrentHover = hoveredSkill?.toLowerCase() === skill.toLowerCase()}
                                    <button 
                                        type="button"
                                        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer
                                        {isCurrentHover 
                                            ? 'bg-primary-600 text-white border-primary-600 shadow-md scale-110 z-20' 
                                            : 'bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400'}"
                                        onmouseenter={() => hoveredSkill = skill}
                                        onmouseleave={() => hoveredSkill = null}
                                        onclick={() => hoveredSkill = hoveredSkill === skill ? null : skill}
                                    >
                                        {#if icon}
                                            <Icon icon={icon} class="text-sm" />
                                        {/if}
                                        {skill}
                                    </button>
                                {/each}
                            </footer>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .reveal-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    :global(.reveal-item.active) {
        opacity: 1;
        transform: translateY(0);
    }
</style>
