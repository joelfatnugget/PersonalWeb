<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { goto } from '$app/navigation';
    import { experiences, projects, personalInfo } from '$lib/data';
    import { searchPortfolio, updatePaletteIndex, type SearchResult } from '$lib/utils';
    import { 
        Search, 
        Moon, 
        Sun, 
        FileText, 
        Briefcase, 
        FolderGit2, 
        Copy, 
        Check, 
        ArrowRight, 
        X,
        Sparkles,
        ExternalLink,
        CornerDownLeft
    } from 'lucide-svelte';

    let { open = $bindable(false) } = $props();

    let query = $state('');
    let selectedIndex = $state(0);
    let copied = $state(false);
    let isDarkMode = $state(false);
    let inputElement = $state<HTMLInputElement | null>(null);

    let searchResults = $derived(searchPortfolio(query, experiences, projects));

    const quickNavItems = [
        { label: 'Go to Home', url: '/', hint: '/' },
        { label: 'Go to Experience', url: '/experience', hint: '/experience' },
        { label: 'Visit Technical Blog', url: 'https://blog.joelfatnugget.xyz/', hint: 'blog.joelfatnugget.xyz', external: true },
        { label: 'Go to Projects', url: '/projects', hint: '/projects' },
        { label: 'Go to Resume', url: '/resume', hint: '/resume' },
        { label: 'Go to Applications', url: '/applications', hint: '/applications' }
    ];

    let totalSelectable = $derived(
        query.trim() !== '' ? searchResults.length : quickNavItems.length
    );

    $effect(() => {
        // Reset selection index when query changes
        if (query !== undefined) {
            selectedIndex = 0;
        }
    });

    $effect(() => {
        if (open) {
            tick().then(() => {
                inputElement?.focus();
            });
        }
    });

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

    function copyToClipboard(text: string) {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        }
    }

    function navigate(url: string) {
        open = false;
        query = '';
        if (url.startsWith('http')) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            goto(url);
        }
    }

    function executeSelection() {
        if (query.trim() !== '') {
            if (searchResults.length > 0 && selectedIndex < searchResults.length) {
                navigate(searchResults[selectedIndex].url);
            }
        } else {
            if (quickNavItems.length > 0 && selectedIndex < quickNavItems.length) {
                navigate(quickNavItems[selectedIndex].url);
            }
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            open = !open;
            return;
        }

        if (!open) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            open = false;
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = updatePaletteIndex(selectedIndex, e.key, totalSelectable);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            executeSelection();
        }
    }

    onMount(() => {
        checkDarkMode();
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    });
</script>

{#if open}
    <!-- Accessible Modal Container -->
    <div 
        class="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
    >
        <!-- Backdrop Button -->
        <button 
            type="button"
            class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200 cursor-default border-none w-full h-full"
            onclick={() => open = false}
            aria-label="Close search overlay"
        ></button>

        <!-- Modal Dialog Window -->
        <div 
            class="relative z-10 w-full max-w-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all transform animate-in zoom-in-95 duration-200"
        >
            <h2 id="command-palette-title" class="sr-only">Quick Command Palette and Search</h2>

            <!-- Search Header -->
            <div class="flex items-center px-4 py-3 border-b border-surface-200 dark:border-surface-800 gap-3">
                <Search class="size-5 text-surface-400" />
                <input 
                    bind:this={inputElement}
                    type="text" 
                    placeholder="Type a command or search (e.g. Visa, Svelte, Resume, Blog)..." 
                    bind:value={query}
                    class="w-full bg-transparent text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none text-base"
                    aria-label="Search portfolio"
                />
                {#if query}
                    <button 
                        type="button"
                        onclick={() => query = ''}
                        class="p-1 rounded-md text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 cursor-pointer"
                        aria-label="Clear search input"
                    >
                        <X class="size-4" />
                    </button>
                {/if}
                <kbd class="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono text-surface-500 bg-surface-100 dark:bg-surface-800 rounded border border-surface-200 dark:border-surface-700">
                    ESC
                </kbd>
            </div>

            <!-- Results & Suggestions -->
            <div class="overflow-y-auto p-2 space-y-4">

                <!-- Dynamic Search Results -->
                {#if query.trim() !== ''}
                    {#if searchResults.length > 0}
                        <div class="space-y-1" role="listbox" aria-label="Search results">
                            <div class="px-3 text-xs font-semibold uppercase tracking-wider text-surface-400 py-1">
                                Search Results ({searchResults.length})
                            </div>
                            {#each searchResults as item, index}
                                {@const isSelected = index === selectedIndex}
                                <button 
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    class="w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors cursor-pointer group {isSelected ? 'bg-primary-500/10 border border-primary-500/30 dark:bg-primary-950/30' : 'hover:bg-surface-100 dark:hover:bg-surface-800'}"
                                    onclick={() => navigate(item.url)}
                                    onmouseenter={() => selectedIndex = index}
                                >
                                    <div class="flex items-center gap-3 overflow-hidden">
                                        {#if item.type === 'page'}
                                            <FileText class="size-4 text-primary-500 flex-shrink-0" />
                                        {:else if item.type === 'experience'}
                                            <Briefcase class="size-4 text-tertiary-500 flex-shrink-0" />
                                        {:else}
                                            <FolderGit2 class="size-4 text-secondary-500 flex-shrink-0" />
                                        {/if}
                                        <div class="truncate">
                                            <div class="text-sm font-semibold text-surface-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                                {item.title}
                                            </div>
                                            <div class="text-xs text-surface-500 truncate">
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        {#if isSelected}
                                            <CornerDownLeft class="size-3.5 text-primary-500 animate-in fade-in" />
                                        {/if}
                                        <ArrowRight class="size-4 text-surface-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                    </div>
                                </button>
                            {/each}
                        </div>
                    {:else}
                        <div class="p-8 text-center text-surface-400">
                            No results found for "<span class="text-surface-900 dark:text-white font-medium">{query}</span>"
                        </div>
                    {/if}
                {:else}
                    <!-- Quick Navigation -->
                    <div class="space-y-1" role="listbox" aria-label="Navigation shortcuts">
                        <div class="px-3 text-xs font-semibold uppercase tracking-wider text-surface-400 py-1">
                            Navigation
                        </div>
                        {#each quickNavItems as item, index}
                            {@const isSelected = index === selectedIndex}
                            <button 
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                class="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer {isSelected ? 'bg-primary-500/10 border border-primary-500/30 dark:bg-primary-950/30' : 'hover:bg-surface-100 dark:hover:bg-surface-800'}"
                                onclick={() => navigate(item.url)}
                                onmouseenter={() => selectedIndex = index}
                            >
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-medium text-surface-800 dark:text-surface-200">{item.label}</span>
                                    {#if item.external}
                                        <ExternalLink class="size-3 text-primary-500" />
                                    {/if}
                                </div>
                                <div class="flex items-center gap-2">
                                    {#if isSelected}
                                        <CornerDownLeft class="size-3 text-primary-500" />
                                    {/if}
                                    <span class="text-xs text-surface-400 font-mono">{item.hint}</span>
                                </div>
                            </button>
                        {/each}
                    </div>

                    <!-- Actions -->
                    <div class="space-y-1">
                        <div class="px-3 text-xs font-semibold uppercase tracking-wider text-surface-400 py-1">
                            Actions & Preferences
                        </div>
                        <button 
                            type="button"
                            class="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-left transition-colors cursor-pointer"
                            onclick={toggleDarkMode}
                        >
                            <div class="flex items-center gap-2">
                                {#if isDarkMode}
                                    <Sun class="size-4 text-amber-400" />
                                    <span class="text-sm font-medium text-surface-800 dark:text-surface-200">Switch to Light Mode</span>
                                {:else}
                                    <Moon class="size-4 text-indigo-500" />
                                    <span class="text-sm font-medium text-surface-800 dark:text-surface-200">Switch to Dark Mode</span>
                                {/if}
                            </div>
                            <span class="text-xs text-surface-400 font-mono">Theme</span>
                        </button>

                        <button 
                            type="button"
                            class="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-left transition-colors cursor-pointer"
                            onclick={() => copyToClipboard(personalInfo.email)}
                        >
                            <div class="flex items-center gap-2">
                                {#if copied}
                                    <Check class="size-4 text-emerald-500" />
                                    <span class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Email Copied</span>
                                {:else}
                                    <Copy class="size-4 text-surface-400" />
                                    <span class="text-sm font-medium text-surface-800 dark:text-surface-200">Copy Contact Email</span>
                                {/if}
                            </div>
                            <span class="text-xs text-surface-400 font-mono">{personalInfo.email}</span>
                        </button>
                    </div>
                {/if}
            </div>

            <!-- Footer Hints -->
            <div class="px-4 py-2.5 bg-surface-50 dark:bg-surface-950 border-t border-surface-200 dark:border-surface-800 flex items-center justify-between text-xs text-surface-500">
                <div class="flex items-center gap-2">
                    <Sparkles class="size-3 text-primary-500" />
                    <span>Quick Navigation & Search</span>
                </div>
                <div class="flex items-center gap-4">
                    <span>Use <kbd class="font-mono bg-surface-200 dark:bg-surface-800 px-1 py-0.5 rounded text-[11px]">↑</kbd> <kbd class="font-mono bg-surface-200 dark:bg-surface-800 px-1 py-0.5 rounded text-[11px]">↓</kbd> to navigate</span>
                    <span>Press <kbd class="font-mono bg-surface-200 dark:bg-surface-800 px-1.5 py-0.5 rounded text-[11px]">ESC</kbd> to exit</span>
                </div>
            </div>
        </div>
    </div>
{/if}
