<script lang="ts">
    import { experiences, skills } from '$lib/data';
    import { Briefcase, Calendar, MapPin } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import { tilt } from '$lib/actions/tilt';
    import { formatDate } from '$lib/utils';
    import Icon from '@iconify/svelte';

    // State for skill highlighting
    let hoveredSkill = $state<string | null>(null);

    // Helper: Find icon for skill
    function getSkillIcon(name: string): string | undefined {
        return skills.find(s => s.name === name)?.icon;
    }

    // Helper: Highlight impact metrics
    function highlightImpact(text: string): string {
        // Matches: 98%, 1st, 2nd, numbers followed by 'man-hours', etc.
        return text.replace(/(\d+%|\d+(?:st|nd|rd|th)|~?\d+\+?)/g, 
            '<span class="font-bold text-primary-600 dark:text-primary-400">$1</span>'
        );
    }

    // Simple Action for intersection observer animation
    function reveal(node: HTMLElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    node.classList.add('active');
                    observer.unobserve(node);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(node);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    }
</script>

<div class="relative min-h-screen overflow-hidden">
    <!-- Rich Background Pattern -->
    <div class="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary-500 opacity-20 blur-[100px]"></div>
        <div class="absolute left-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-tertiary-500 opacity-20 blur-[100px]"></div>
    </div>

    <div class="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <header class="mb-16 text-center">
        <h1 class="h1 font-bold mb-4">Professional Experience</h1>
        <p class="text-surface-600 dark:text-surface-300">My journey through the tech industry.</p>
    </header>

    <div class="relative space-y-12">
        <!-- Vertical Line -->
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-surface-200-700-token transform -translate-x-1/2"></div>

        {#each experiences as job, i}
            <div 
                use:reveal 
                id={job.id}
                class="reveal-item relative flex flex-col md:flex-row gap-8 items-start group"
                class:md:flex-row-reverse={i % 2 !== 0}
            >
                <!-- Timeline Dot -->
                <div 
                    class="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-surface-50 dark:border-surface-900 transform -translate-x-1/2 mt-6 z-10 transition-transform duration-300 group-hover:scale-150"
                    style="background-color: {job.color || 'var(--color-primary-500)'}"
                ></div>

                <!-- Date (Desktop: Opposite side) -->
                <div class="hidden md:block w-1/2 text-right pt-5 px-8" class:text-left={i % 2 !== 0} class:text-right={i % 2 === 0}>
                    <span 
                        class="font-mono text-sm font-bold tracking-widest"
                        style="color: {job.color || 'var(--color-primary-500)'}"
                    >
                        {formatDate(job.startDate)} — {formatDate(job.endDate)}
                    </span>
                </div>

                <!-- Content Card -->
                <div class="w-full md:w-1/2 pl-12 md:pl-0">
                    <!-- Mobile Date -->
                    <div 
                        class="md:hidden font-mono text-sm font-bold tracking-widest mb-2"
                        style="color: {job.color || 'var(--color-primary-500)'}"
                    >
                        {formatDate(job.startDate)} — {formatDate(job.endDate)}
                    </div>
                    
                    <div 
                        use:tilt={{ max: 5, scale: 1.02 }}
                        class="card p-6 shadow-xl transition-all duration-300 border-l-4 bg-surface-50 dark:bg-surface-800 relative overflow-hidden"
                        style="border-left-color: {job.color || 'var(--color-primary-500)'}; --brand-color: {job.color || 'var(--color-primary-500)'}"
                    >
                        <!-- Glow Effect on Hover -->
                        <div class="absolute inset-0 bg-gradient-to-r from-[var(--brand-color)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>

                        <!-- Watermark Logo -->
                        {#if job.logo}
                            <img 
                                src={job.logo} 
                                alt="" 
                                class="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.03] grayscale rotate-12 pointer-events-none z-0"
                            />
                        {/if}

                        <header class="mb-4 relative z-10 flex justify-between items-start">
                            <div>
                                <h3 class="h3 font-bold">{job.role}</h3>
                                <div class="flex items-center gap-2 text-surface-600 dark:text-surface-300 text-sm mt-1">
                                    <Briefcase class="size-4" />
                                    <span>{job.company}</span>
                                    <span class="mx-1">•</span>
                                    <MapPin class="size-4" />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                            
                            {#if job.logo}
                                <div class="bg-white p-1.5 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700">
                                    <img src={job.logo} alt="{job.company} Logo" class="w-10 h-10 object-contain" />
                                </div>
                            {/if}
                        </header>

                        <ul class="list-disc list-outside ml-4 space-y-2 text-surface-700 dark:text-surface-200 mb-6 relative z-10">
                            {#each job.description as item}
                                <li>{@html highlightImpact(item)}</li>
                            {/each}
                        </ul>

                        <footer class="flex flex-wrap gap-2 relative z-10">
                            {#each job.skills as skill}
                                {@const icon = getSkillIcon(skill)}
                                <span 
                                    class="badge flex items-center gap-1.5 py-1 pr-3 pl-2 transition-all duration-200 cursor-default border border-surface-200 dark:border-surface-700
                                    {hoveredSkill === skill ? 'bg-[var(--brand-color)] text-white scale-110 shadow-md border-transparent' : 'variant-soft-secondary'}"
                                    onmouseenter={() => hoveredSkill = skill}
                                    onmouseleave={() => hoveredSkill = null}
                                >
                                    {#if icon}
                                        <Icon icon={icon} class="text-lg" />
                                    {/if}
                                    {skill}
                                </span>
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
