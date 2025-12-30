<script lang="ts">
    import { socials } from '$lib/data';
    import Icon from '@iconify/svelte';
    import { FileText, Home, AppWindow } from 'lucide-svelte';

    let hoverIndex: number | null = $state(null);
</script>

<!-- 
    Responsive Dock Container 
    Mobile: Fixed bottom, horizontal, centered
    Desktop (md): Fixed left, vertical, centered vertically
-->
<div class="fixed z-50 transition-all duration-300
    bottom-6 left-1/2 -translate-x-1/2 flex-row items-end 
    md:bottom-auto md:top-1/2 md:left-6 md:-translate-y-1/2 md:-translate-x-0 md:flex-col md:items-start
">
    <div class="
        flex gap-2 p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-300
        rounded-2xl
        md:flex-col md:gap-4 md:p-4
    ">
    
        <!-- Home -->
        <a 
            href="/"
            class="relative p-3 rounded-xl bg-surface-200 dark:bg-surface-800 hover:bg-primary-500 hover:text-white transition-all duration-300 ease-out flex items-center justify-center group"
            class:scale-125={hoverIndex === -1}
            onmouseenter={() => hoverIndex = -1}
            onmouseleave={() => hoverIndex = null}
        >
            <Home class="size-6" />
            
            <!-- Tooltip: Top on mobile, Right on desktop -->
            <span class="
                absolute bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none
                -top-10 left-1/2 -translate-x-1/2
                md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-3 md:translate-x-0
            ">Home</span>
        </a>

        <!-- Divider for desktop visual separation -->
        <div class="hidden md:block w-full h-px bg-surface-300 dark:bg-surface-700 my-1"></div>

        <!-- Socials -->
        {#each socials as social, i}
            <a 
                href={social.url}
                target="_blank"
                class="relative p-3 rounded-xl bg-surface-200 dark:bg-surface-800 hover:bg-primary-500 hover:text-white transition-all duration-300 ease-out flex items-center justify-center group"
                class:scale-125={hoverIndex === i}
                onmouseenter={() => hoverIndex = i}
                onmouseleave={() => hoverIndex = null}
            >
                <Icon icon={social.icon} class="text-2xl" />
                <span class="
                    absolute bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none
                    -top-10 left-1/2 -translate-x-1/2
                    md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-3 md:translate-x-0
                ">{social.platform}</span>
            </a>
        {/each}

        <!-- Divider -->
        <div class="hidden md:block w-full h-px bg-surface-300 dark:bg-surface-700 my-1"></div>

        <!-- Applications Shortcut -->
        <a 
            href="/applications"
            class="relative p-3 rounded-xl bg-surface-200 dark:bg-surface-800 hover:bg-primary-500 hover:text-white transition-all duration-300 ease-out flex items-center justify-center group"
            class:scale-125={hoverIndex === 98}
            onmouseenter={() => hoverIndex = 98}
            onmouseleave={() => hoverIndex = null}
        >
            <AppWindow class="size-6" />
            <span class="
                absolute bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none
                -top-10 left-1/2 -translate-x-1/2
                md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-3 md:translate-x-0
            ">Applications</span>
        </a>

        <!-- Resume Shortcut -->
        <a 
            href="/resume"
            class="relative p-3 rounded-xl bg-surface-200 dark:bg-surface-800 hover:bg-primary-500 hover:text-white transition-all duration-300 ease-out flex items-center justify-center group"
            class:scale-125={hoverIndex === 99}
            onmouseenter={() => hoverIndex = 99}
            onmouseleave={() => hoverIndex = null}
        >
            <FileText class="size-6" />
            <span class="
                absolute bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none
                -top-10 left-1/2 -translate-x-1/2
                md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-3 md:translate-x-0
            ">Resume</span>
        </a>
    </div>
</div>
