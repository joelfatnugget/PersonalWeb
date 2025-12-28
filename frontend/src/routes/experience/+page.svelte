<script lang="ts">
    import { experiences } from '$lib/data';
    import { Briefcase, Calendar, MapPin } from 'lucide-svelte';
    import { onMount } from 'svelte';

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

<div class="container mx-auto px-4 py-12 max-w-4xl">
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
                <div class="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-surface-50 dark:border-surface-900 transform -translate-x-1/2 mt-6 z-10 transition-transform duration-300 group-hover:scale-150"></div>

                <!-- Date (Desktop: Opposite side) -->
                <div class="hidden md:block w-1/2 text-right pt-5 px-8" class:text-left={i % 2 !== 0} class:text-right={i % 2 === 0}>
                    <span class="font-mono text-sm text-primary-500 font-bold tracking-widest">{job.startDate} — {job.endDate}</span>
                </div>

                <!-- Content Card -->
                <div class="w-full md:w-1/2 pl-12 md:pl-0">
                    <!-- Mobile Date -->
                    <div class="md:hidden font-mono text-sm text-primary-500 font-bold tracking-widest mb-2">{job.startDate} — {job.endDate}</div>
                    
                    <div class="card p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-primary-500 bg-surface-50 dark:bg-surface-800">
                        <header class="mb-4">
                            <h3 class="h3 font-bold">{job.role}</h3>
                            <div class="flex items-center gap-2 text-surface-600 dark:text-surface-300 text-sm mt-1">
                                <Briefcase class="size-4" />
                                <span>{job.company}</span>
                                <span class="mx-1">•</span>
                                <MapPin class="size-4" />
                                <span>{job.location}</span>
                            </div>
                        </header>

                        <ul class="list-disc list-outside ml-4 space-y-2 text-surface-700 dark:text-surface-200 mb-6">
                            {#each job.description as item}
                                <li>{item}</li>
                            {/each}
                        </ul>

                        <footer class="flex flex-wrap gap-2">
                            {#each job.skills as skill}
                                <span class="badge variant-soft-secondary hover:variant-filled-secondary transition-colors cursor-default">
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
