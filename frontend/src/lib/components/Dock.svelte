<script lang="ts">
    import { socials } from '$lib/data';
    import Icon from '@iconify/svelte';
    import { FileText, Home, AppWindow } from 'lucide-svelte';

    let hoverIndex: number | null = $state(null);
</script>

<!-- 
    Responsive Dock Container 
    Mobile: Fixed bottom, horizontal, centered, compact
    Desktop (md): Fixed left, vertical, centered vertically
-->
<div class="fixed z-50 transition-all duration-300
    bottom-4 left-1/2 -translate-x-1/2 flex-row items-end max-w-[95vw]
    md:bottom-auto md:top-1/2 md:left-6 md:-translate-y-1/2 md:-translate-x-0 md:flex-col md:items-start
" role="navigation" aria-label="Quick Actions Dock">
    <div class="
        flex gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-300
        rounded-2xl
        md:flex-col md:gap-3 md:p-3
    ">
    
        <!-- Home -->
        <a 
            href="/"
            class="relative p-2 sm:p-2.5 rounded-xl bg-surface-200/80 dark:bg-surface-800/80 hover:bg-primary-500 hover:text-white transition-all duration-300 ease-out flex items-center justify-center group"
            class:scale-110={hoverIndex === -1}
            onmouseenter={() => hoverIndex = -1}
            onmouseleave={() => hoverIndex = null}
            aria-label="Home"
        >
            <Home class="size-5 md:size-6" />
            
            <span class="
                absolute bg-surface-900 dark:bg-black text-white text-[11px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md
                -top-9 left-1/2 -translate-x-1/2
                md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-3 md:translate-x-0
            ">Home</span>
        </a>

        <!-- Divider for desktop visual separation -->
        <div class="hidden md:block w-full h-px bg-surface-300 dark:bg-surface-700 my-0.5"></div>

        <!-- Socials -->
        {#each socials as social, i}
            <a 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                class="relative p-2 sm:p-2.5 rounded-xl bg-surface-200/80 dark:bg-surface-800/80 hover:bg-primary-500 hover:text-white transition-all duration-300 ease-out flex items-center justify-center group"
                class:scale-110={hoverIndex === i}
                onmouseenter={() => hoverIndex = i}
                onmouseleave={() => hoverIndex = null}
                aria-label={social.platform}
            >
                <Icon icon={social.icon} class="text-xl md:text-2xl" />
                <span class="
                    absolute bg-surface-900 dark:bg-black text-white text-[11px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md
                    -top-9 left-1/2 -translate-x-1/2
                    md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-3 md:translate-x-0
                ">{social.platform}</span>
            </a>
        {/each}

        <!-- Divider -->
        <div class="hidden md:block w-full h-px bg-surface-300 dark:bg-surface-700 my-0.5"></div>

        <!-- Applications Shortcut -->
        <a 
            href="/applications"
            class="relative p-2 sm:p-2.5 rounded-xl bg-surface-200/80 dark:bg-surface-800/80 hover:bg-primary-500 hover:text-white transition-all duration-300 ease-out flex items-center justify-center group"
            class:scale-110={hoverIndex === 98}
            onmouseenter={() => hoverIndex = 98}
            onmouseleave={() => hoverIndex = null}
            aria-label="Applications"
        >
            <AppWindow class="size-5 md:size-6" />
            <span class="
                absolute bg-surface-900 dark:bg-black text-white text-[11px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md
                -top-9 left-1/2 -translate-x-1/2
                md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-3 md:translate-x-0
            ">Applications</span>
        </a>

        <!-- Resume Shortcut -->
        <a 
            href="/resume"
            class="relative p-2 sm:p-2.5 rounded-xl bg-surface-200/80 dark:bg-surface-800/80 hover:bg-primary-500 hover:text-white transition-all duration-300 ease-out flex items-center justify-center group"
            class:scale-110={hoverIndex === 99}
            onmouseenter={() => hoverIndex = 99}
            onmouseleave={() => hoverIndex = null}
            aria-label="Resume"
        >
            <FileText class="size-5 md:size-6" />
            <span class="
                absolute bg-surface-900 dark:bg-black text-white text-[11px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md
                -top-9 left-1/2 -translate-x-1/2
                md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-3 md:translate-x-0
            ">Resume</span>
        </a>
    </div>
</div>
