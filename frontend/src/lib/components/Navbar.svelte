<script lang="ts">
	import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { Search, Sun, Moon, Command } from 'lucide-svelte';
    import CommandPalette from './CommandPalette.svelte';

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/experience', label: 'Experience' },
        { href: '/projects', label: 'Projects' },
        { href: '/applications', label: 'Applications' },
        { href: '/resume', label: 'Resume' },
    ];

    let commandOpen = $state(false);
    let isDarkMode = $state(false);

    function checkDarkMode() {
        if (typeof document !== 'undefined') {
            isDarkMode = document.documentElement.classList.contains('dark');
        }
    }

    function toggleDarkMode() {
        if (typeof document !== 'undefined') {
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
                document.documentElement.setAttribute('data-mode', 'dark');
                localStorage.theme = 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.setAttribute('data-mode', 'light');
                localStorage.theme = 'light';
            }
        }
    }

    onMount(() => {
        checkDarkMode();
    });
</script>

<div class="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-surface-200/50 dark:border-surface-800/50 transition-colors duration-300">
    <div class="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        <!-- Brand Logo -->
        <a href="/" class="text-xl md:text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-1 text-surface-900 dark:text-white">
            Joel<span class="text-primary-500 font-extrabold">.</span>Tan
        </a>

        <!-- Desktop Navigation & Quick Tools -->
        <div class="flex items-center gap-4 md:gap-6">
            <!-- Nav Links -->
            <nav class="hidden md:flex items-center gap-6">
                {#each navLinks as link}
                    <a 
                        href={link.href} 
                        class="text-sm font-medium transition-all duration-200 relative py-1 {$page.url.pathname === link.href ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white'}"
                    >
                        {link.label}
                        {#if $page.url.pathname === link.href}
                            <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full animate-in fade-in zoom-in-95 duration-200"></span>
                        {/if}
                    </a>
                {/each}
            </nav>

            <div class="h-4 w-px bg-surface-200 dark:bg-surface-800 hidden md:block"></div>

            <!-- Command Palette Trigger Button -->
            <button 
                onclick={() => commandOpen = true}
                class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-100 dark:bg-surface-800/80 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300 text-xs font-medium border border-surface-200/80 dark:border-surface-700/80 transition-all duration-200 group cursor-pointer"
                aria-label="Open Command Palette"
            >
                <Search class="size-3.5 group-hover:scale-110 transition-transform text-primary-500" />
                <span class="hidden sm:inline">Search...</span>
                <kbd class="font-mono text-[10px] bg-white dark:bg-surface-900 px-1.5 py-0.5 rounded border border-surface-300 dark:border-surface-600 shadow-xs text-surface-500">
                    ⌘K
                </kbd>
            </button>

            <!-- Light/Dark Mode Switcher -->
            <button 
                onclick={toggleDarkMode}
                class="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-200 border border-surface-200 dark:border-surface-700 transition-all duration-200 cursor-pointer"
                aria-label="Toggle Theme"
            >
                {#if isDarkMode}
                    <Sun class="size-4 text-amber-400 animate-in spin-in-90 duration-300" />
                {:else}
                    <Moon class="size-4 text-slate-700 animate-in spin-in-90 duration-300" />
                {/if}
            </button>
        </div>
    </div>
</div>

<!-- Command Palette Modal -->
<CommandPalette bind:open={commandOpen} />
