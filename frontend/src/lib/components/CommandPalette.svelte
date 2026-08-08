<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { experiences, projects, personalInfo, socials } from '$lib/data';
    import { searchPortfolio, type SearchResult } from '$lib/utils';
    import { 
        Search, 
        Command, 
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
        ExternalLink
    } from 'lucide-svelte';
    import Icon from '@iconify/svelte';

    let { open = $bindable(false) } = $props();

    let query = $state('');
    let selectedIndex = $state(0);
    let copied = $state(false);
    let isDarkMode = $state(false);

    let searchResults = $derived(searchPortfolio(query, experiences, projects));

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
        navigator.clipboard.writeText(text);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }

    function handleKeydown(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            open = !open;
        } else if (e.key === 'Escape' && open) {
            open = false;
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

    onMount(() => {
        checkDarkMode();
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    });
</script>

{#if open}
    <!-- Backdrop -->
    <div 
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 md:pt-24 px-4 transition-opacity animate-in fade-in duration-200"
        onclick={() => open = false}
        role="button"
        tabindex="-1"
    >
        <!-- Modal Content -->
        <div 
            class="w-full max-w-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all transform animate-in zoom-in-95 duration-200"
            onclick={(e) => e.stopPropagation()}
            role="document"
        >
            <!-- Search Header -->
            <div class="flex items-center px-4 py-3 border-b border-surface-200 dark:border-surface-800 gap-3">
                <Search class="size-5 text-surface-400" />
                <input 
                    type="text" 
                    placeholder="Type a command or search (e.g. Visa, Svelte, Resume, Dark)..." 
                    bind:value={query}
                    class="w-full bg-transparent text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none text-base"
                    autofocus
                />
                {#if query}
                    <button 
                        onclick={() => query = ''}
                        class="p-1 rounded-md text-surface-400 hover:text-surface-700 dark:hover:text-surface-200"
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
                        <div class="space-y-1">
                            <div class="px-3 text-xs font-semibold uppercase tracking-wider text-surface-400 py-1">
                                Search Results ({searchResults.length})
                            </div>
                            {#each searchResults as item}
                                <button 
                                    class="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-left transition-colors group"
                                    onclick={() => navigate(item.url)}
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
                                    <ArrowRight class="size-4 text-surface-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
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
                    <div class="space-y-1">
                        <div class="px-3 text-xs font-semibold uppercase tracking-wider text-surface-400 py-1">
                            Navigation
                        </div>
                        <button 
                            class="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-left transition-colors"
                            onclick={() => navigate('/')}
                        >
                            <span class="text-sm font-medium text-surface-800 dark:text-surface-200">Go to Home</span>
                            <span class="text-xs text-surface-400 font-mono">/</span>
                        </button>
                        <button 
                            class="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-left transition-colors"
                            onclick={() => navigate('/experience')}
                        >
                            <span class="text-sm font-medium text-surface-800 dark:text-surface-200">Go to Experience</span>
                            <span class="text-xs text-surface-400 font-mono">/experience</span>
                        </button>
                        <button 
                            class="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-left transition-colors"
                            onclick={() => navigate('https://blog.joelfatnugget.xyz/')}
                        >
                            <div class="flex items-center gap-2">
                                <span class="text-sm font-medium text-surface-800 dark:text-surface-200">Visit Technical Blog</span>
                                <ExternalLink class="size-3 text-primary-500" />
                            </div>
                            <span class="text-xs text-surface-400 font-mono">blog.joelfatnugget.xyz</span>
                        </button>
                        <button 
                            class="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-left transition-colors"
                            onclick={() => navigate('/projects')}
                        >
                            <span class="text-sm font-medium text-surface-800 dark:text-surface-200">Go to Projects</span>
                            <span class="text-xs text-surface-400 font-mono">/projects</span>
                        </button>
                        <button 
                            class="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-left transition-colors"
                            onclick={() => navigate('/resume')}
                        >
                            <span class="text-sm font-medium text-surface-800 dark:text-surface-200">Go to Resume</span>
                            <span class="text-xs text-surface-400 font-mono">/resume</span>
                        </button>
                    </div>

                    <!-- Actions -->
                    <div class="space-y-1">
                        <div class="px-3 text-xs font-semibold uppercase tracking-wider text-surface-400 py-1">
                            Actions & Preferences
                        </div>
                        <button 
                            class="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-left transition-colors"
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
                            class="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-left transition-colors"
                            onclick={() => copyToClipboard(personalInfo.email)}
                        >
                            <div class="flex items-center gap-2">
                                {#if copied}
                                    <Check class="size-4 text-emerald-500" />
                                    <span class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Email Copied!</span>
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
                    <span>antigravity engine v2.5</span>
                </div>
                <div class="flex items-center gap-4">
                    <span>Press <kbd class="font-mono bg-surface-200 dark:bg-surface-800 px-1.5 py-0.5 rounded">ESC</kbd> to exit</span>
                </div>
            </div>
        </div>
    </div>
{/if}
