<script lang="ts">
    import { getCodePageTable, CODE_PAGES, type SupportedCodePage, type CodePageByteEntry } from '$lib/tlv/ebcdic';
    import { Search, Info, Check, Copy, Grid, ArrowRightLeft } from 'lucide-svelte';

    export let selectedCodePage: SupportedCodePage = 'IBM1047';

    let searchQuery = '';
    let selectedCell: CodePageByteEntry | null = null;
    let compareCodePage: SupportedCodePage = 'ASCII';

    $: table = getCodePageTable(selectedCodePage);
    $: compareTable = getCodePageTable(compareCodePage);

    $: filteredTable = table.filter(entry => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
            entry.hex.toLowerCase().includes(q) ||
            entry.dec.toString().includes(q) ||
            entry.binary.includes(q) ||
            entry.char.toLowerCase().includes(q)
        );
    });

    function selectEntry(entry: CodePageByteEntry) {
        selectedCell = entry;
    }

    const categoryColors: Record<CodePageByteEntry['category'], string> = {
        control: 'bg-surface-200/50 dark:bg-surface-800/50 text-surface-500 border-surface-300 dark:border-surface-700',
        letter: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30 font-bold',
        digit: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold',
        symbol: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        space: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
    };
</script>

<div class="space-y-6">
    <!-- Header Controls -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface-100/80 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700">
        <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 flex items-center gap-2">
                <Grid class="size-4 text-primary-500" />
                256-Byte Character Set Matrix ({selectedCodePage})
            </h3>
            <p class="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
                Click any byte cell in the grid to inspect its decimal, binary, and cross-code-page character mappings.
            </p>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto">
            <!-- Search Input -->
            <div class="relative w-full sm:w-64">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-surface-400" />
                <input 
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search byte e.g. C1, A, 193..."
                    class="w-full bg-surface-50 dark:bg-surface-900 border border-surface-300 dark:border-surface-700 rounded-xl pl-9 pr-3 py-1.5 text-xs font-mono focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
            </div>
        </div>
    </div>

    <!-- Category Legend -->
    <div class="flex flex-wrap items-center gap-3 text-xs font-mono px-2">
        <span class="text-surface-400 uppercase tracking-wider text-[10px] font-sans font-semibold">Legend:</span>
        <span class="px-2 py-0.5 rounded border bg-sky-500/10 text-sky-500 border-sky-500/20">Letters</span>
        <span class="px-2 py-0.5 rounded border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Digits</span>
        <span class="px-2 py-0.5 rounded border bg-amber-500/10 text-amber-500 border-amber-500/20">Symbols</span>
        <span class="px-2 py-0.5 rounded border bg-purple-500/10 text-purple-500 border-purple-500/20">Space</span>
        <span class="px-2 py-0.5 rounded border bg-surface-200/50 text-surface-400 border-surface-300">Controls</span>
    </div>

    <!-- 16x16 Interactive Byte Matrix Grid -->
    <div class="bg-surface-100/90 dark:bg-surface-800/80 p-4 sm:p-5 rounded-3xl border border-surface-200 dark:border-surface-700/80 shadow-lg overflow-x-auto">
        <div class="min-w-[640px]">
            <!-- Column Header (0x0 to 0xF) -->
            <div class="grid grid-cols-17 gap-1 mb-2 text-center text-[11px] font-mono text-surface-400 font-semibold">
                <div class="text-primary-500">Row</div>
                {#each [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'] as col}
                    <div>+{col}</div>
                {/each}
            </div>

            <!-- 16 Rows (0x0_ to 0xF_) -->
            {#each Array(16) as _, rowIndex}
                {@const rowHex = rowIndex.toString(16).toUpperCase()}
                <div class="grid grid-cols-17 gap-1 mb-1 items-center">
                    <div class="text-[11px] font-mono font-bold text-primary-500 text-center select-none">
                        0x{rowHex}_
                    </div>

                    {#each Array(16) as _, colIndex}
                        {@const byteVal = rowIndex * 16 + colIndex}
                        {@const entry = table[byteVal]}
                        {@const isSelected = selectedCell?.dec === entry.dec}

                        <button 
                            class="h-10 rounded-lg border text-center transition-all flex flex-col items-center justify-center p-0.5 relative group {categoryColors[entry.category]} {isSelected ? 'ring-2 ring-primary-500 scale-105 shadow-md z-10' : 'hover:scale-105 hover:shadow'}"
                            on:click={() => selectEntry(entry)}
                            title="Click to view byte 0x{entry.hex} ({entry.mnemonic || entry.char}) details"
                        >
                            <span class="text-[9px] font-mono opacity-60 text-surface-500 dark:text-surface-400">
                                {entry.hex}
                            </span>
                            <span class="text-xs truncate max-w-full px-0.5 {entry.mnemonic ? 'font-mono font-extrabold text-[10px]' : 'font-sans'}">
                                {entry.mnemonic || entry.char}
                            </span>
                        </button>
                    {/each}
                </div>
            {/each}
        </div>
    </div>

    <!-- Inspector Drawer / Card for Selected Byte -->
    {#if selectedCell}
        <div class="bg-surface-100 dark:bg-surface-800/90 p-5 rounded-3xl border border-primary-500/40 shadow-xl space-y-4 font-mono">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="px-3 py-1.5 rounded-xl bg-primary-500 text-white font-bold text-sm">
                        Byte 0x{selectedCell.hex}
                    </div>
                    <div>
                        <h4 class="text-sm font-sans font-bold text-surface-900 dark:text-surface-100">
                            Character: <span class="text-primary-500 text-lg">"{selectedCell.char}"</span>
                        </h4>
                        <p class="text-xs font-sans text-surface-500">Category: {selectedCell.category.toUpperCase()}</p>
                    </div>
                </div>

                <div class="flex items-center gap-2 text-xs">
                    <span class="text-surface-400">Compare with:</span>
                    <select 
                        bind:value={compareCodePage}
                        class="bg-surface-50 dark:bg-surface-900 border border-surface-300 dark:border-surface-700 rounded-lg px-2 py-1 text-xs"
                    >
                        {#each CODE_PAGES as cp}
                            <option value={cp.id}>{cp.id}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div class="p-3 rounded-xl bg-surface-200/50 dark:bg-surface-900/60 border border-surface-300 dark:border-surface-700">
                    <span class="text-[10px] text-surface-400 block font-sans">Decimal</span>
                    <span class="text-sm font-bold text-surface-800 dark:text-surface-200">{selectedCell.dec}</span>
                </div>
                <div class="p-3 rounded-xl bg-surface-200/50 dark:bg-surface-900/60 border border-surface-300 dark:border-surface-700">
                    <span class="text-[10px] text-surface-400 block font-sans">Binary</span>
                    <span class="text-xs font-bold text-sky-500">{selectedCell.binary}</span>
                </div>
                <div class="p-3 rounded-xl bg-surface-200/50 dark:bg-surface-900/60 border border-surface-300 dark:border-surface-700">
                    <span class="text-[10px] text-surface-400 block font-sans">{selectedCodePage} Char</span>
                    <span class="text-sm font-bold text-amber-500">"{selectedCell.char}"</span>
                </div>
                <div class="p-3 rounded-xl bg-surface-200/50 dark:bg-surface-900/60 border border-surface-300 dark:border-surface-700">
                    <span class="text-[10px] text-surface-400 block font-sans">{compareCodePage} Char</span>
                    <span class="text-sm font-bold text-purple-500">"{compareTable[selectedCell.dec]?.char || '.'}"</span>
                </div>
            </div>
        </div>
    {/if}
</div>
