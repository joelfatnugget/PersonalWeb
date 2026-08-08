<script lang="ts">
    import type { TLVNode } from '$lib/tlv/parser';
    import { ChevronRight, ChevronDown, Copy, Check, Tag, Binary, Type } from 'lucide-svelte';

    export let node: TLVNode;
    export let depth = 0;

    let expanded = true;
    let copied = false;

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }

    function toggleExpand() {
        if (node.isConstructed && node.children && node.children.length > 0) {
            expanded = !expanded;
        }
    }
</script>

<div class="mb-3 rounded-xl border border-surface-200 dark:border-surface-700/80 bg-surface-50/50 dark:bg-surface-800/40 backdrop-blur-sm shadow-sm transition-all hover:border-primary-500/40">
    <!-- Header / Summary Bar -->
    <div 
        class="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 select-none cursor-pointer"
        on:click={toggleExpand}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Enter' && toggleExpand()}
    >
        <div class="flex items-center gap-2.5 min-w-0">
            {#if node.isConstructed && node.children && node.children.length > 0}
                <button 
                    class="p-1 rounded-md text-surface-500 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                    aria-label={expanded ? "Collapse node" : "Expand node"}
                >
                    {#if expanded}
                        <ChevronDown class="size-4" />
                    {:else}
                        <ChevronRight class="size-4" />
                    {/if}
                </button>
            {:else}
                <div class="size-4"></div>
            {/if}

            <!-- Tag Badge -->
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono font-bold text-xs tracking-wide bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                <Tag class="size-3" />
                <span>0x{node.tag}</span>
            </div>

            <!-- Description -->
            <span class="font-medium text-sm text-surface-900 dark:text-surface-100 truncate">
                {node.description || `Tag 0x${node.tag}`}
            </span>

            {#if node.isConstructed}
                <span class="px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    Constructed
                </span>
            {/if}
        </div>

        <div class="flex items-center gap-3 font-mono text-xs text-surface-500 dark:text-surface-400">
            <!-- Length -->
            <span class="px-2 py-1 rounded bg-surface-200/60 dark:bg-surface-700/60">
                {node.length} byte{node.length === 1 ? '' : 's'}
            </span>

            <!-- Copy raw hex -->
            <button 
                class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                on:click|stopPropagation={() => copyToClipboard(node.rawHex)}
                title="Copy complete raw hex"
            >
                {#if copied}
                    <Check class="size-3.5 text-emerald-500" />
                    <span class="text-emerald-500 font-sans text-xs">Copied</span>
                {:else}
                    <Copy class="size-3.5" />
                    <span class="font-sans text-xs hidden sm:inline">Copy Hex</span>
                {/if}
            </button>
        </div>
    </div>

    <!-- Body Details -->
    <div class="px-4 pb-4 pt-1 border-t border-surface-200/60 dark:border-surface-700/50 space-y-3 font-mono text-xs">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <!-- Hex Value -->
            <div class="p-3 rounded-lg bg-surface-100 dark:bg-surface-900/80 border border-surface-200 dark:border-surface-800">
                <div class="flex items-center justify-between text-surface-500 text-[11px] font-sans font-medium mb-1.5">
                    <span class="flex items-center gap-1"><Binary class="size-3 text-sky-500" /> Hex Value</span>
                    <span class="text-[10px] text-surface-400">Len Hex: {node.lengthHex}</span>
                </div>
                <div class="break-all font-mono text-sky-600 dark:text-sky-400 font-semibold select-all">
                    {node.valueHex || '(empty)'}
                </div>
            </div>

            <!-- Translated Raw Literal Value -->
            <div class="p-3 rounded-lg bg-surface-100 dark:bg-surface-900/80 border border-surface-200 dark:border-surface-800">
                <div class="flex items-center justify-between text-surface-500 text-[11px] font-sans font-medium mb-1.5">
                    <span class="flex items-center gap-1"><Type class="size-3 text-amber-500" /> Raw Literal Value</span>
                    <span class="text-[10px] text-amber-500/80">Translated</span>
                </div>
                <div class="break-all font-sans text-amber-600 dark:text-amber-300 font-medium select-all">
                    {node.literalValue || '(empty)'}
                </div>
            </div>
        </div>

        <!-- Nested Children -->
        {#if node.isConstructed && node.children && node.children.length > 0 && expanded}
            <div class="mt-4 pl-3 sm:pl-5 border-l-2 border-primary-500/30 space-y-3">
                <div class="text-[11px] font-sans font-semibold uppercase tracking-wider text-surface-400 mb-2">
                    Child Tags ({node.children.length})
                </div>
                {#each node.children as child}
                    <svelte:self node={child} depth={depth + 1} />
                {/each}
            </div>
        {/if}
    </div>
</div>
