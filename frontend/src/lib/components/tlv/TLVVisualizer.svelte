<script lang="ts">
    import type { TLVNode } from '$lib/tlv/parser';
    import type { SupportedCodePage } from '$lib/tlv/ebcdic';
    import { Binary, Layers, ArrowRight, Sparkles, Cpu, Activity, PieChart, CheckCircle2 } from 'lucide-svelte';

    export let nodes: TLVNode[] = [];
    export let inputHex: string = '';
    export let selectedCodePage: SupportedCodePage = 'IBM1047';

    let activeStep = 1;

    // Calculate Byte distribution stats
    $: totalHexLength = inputHex.replace(/[^0-9a-fA-F]/g, '').length;
    $: totalBytes = Math.floor(totalHexLength / 2);

    $: tagBytesCount = nodes.reduce((acc, n) => acc + (n.tag.length / 2), 0);
    $: lenBytesCount = nodes.reduce((acc, n) => acc + (n.lengthHex.length / 2), 0);
    $: valueBytesCount = nodes.reduce((acc, n) => acc + n.length, 0);

    $: tagPct = totalBytes > 0 ? Math.round((tagBytesCount / totalBytes) * 100) : 0;
    $: lenPct = totalBytes > 0 ? Math.round((lenBytesCount / totalBytes) * 100) : 0;
    $: valPct = totalBytes > 0 ? Math.round((valueBytesCount / totalBytes) * 100) : 0;

    const pipelineSteps = [
        { step: 1, title: 'Byte Stream Ingestion', desc: 'Raw hexadecimal byte stream received into memory buffer' },
        { step: 2, title: 'Tag & Bitmask Decoding', desc: 'Bit 6 (Constructed flag) & Bit 1-5 (Multi-byte tag indicator)' },
        { step: 3, title: 'Length Field Unpacking', desc: 'Short form (<=127 bytes) or Long form (0x81, 0x82 length prefixes)' },
        { step: 4, title: 'IBM Character Set Mapping', desc: `EBCDIC code page translation using selected ${selectedCodePage}` },
        { step: 5, title: 'Structured Tree Generation', desc: 'Hierarchical TLV Node graph produced with metadata' }
    ];
</script>

<div class="space-y-6">
    <!-- Visual Parsing Pipeline Stepper -->
    <div class="bg-surface-100/90 dark:bg-surface-800/80 p-5 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 flex items-center gap-2">
                <Activity class="size-4 text-emerald-500" />
                Interactive Parsing Pipeline
            </h3>
            <span class="text-xs font-mono text-primary-500 font-bold">
                Step {activeStep} of 5
            </span>
        </div>

        <!-- Stepper Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {#each pipelineSteps as s}
                <button 
                    class="p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 relative overflow-hidden {activeStep === s.step ? 'bg-primary-500 text-white border-primary-500 shadow-lg scale-105' : 'bg-surface-50 dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-primary-500/40'}"
                    on:click={() => activeStep = s.step}
                >
                    <div class="flex items-center justify-between text-xs font-mono">
                        <span class="size-5 rounded-full flex items-center justify-center font-bold text-[10px] {activeStep === s.step ? 'bg-white text-primary-600' : 'bg-surface-200 dark:bg-surface-800'}">
                            {s.step}
                        </span>
                        {#if activeStep === s.step}
                            <Sparkles class="size-3.5 animate-pulse" />
                        {/if}
                    </div>

                    <div>
                        <h4 class="text-xs font-bold leading-snug line-clamp-1">{s.title}</h4>
                        <p class="text-[10px] opacity-80 line-clamp-2 mt-0.5 font-normal">{s.desc}</p>
                    </div>
                </button>
            {/each}
        </div>
    </div>

    <!-- Payload Byte Breakdown Graph -->
    {#if nodes.length > 0}
        <div class="bg-surface-100/90 dark:bg-surface-800/80 p-5 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 flex items-center gap-2">
                    <PieChart class="size-4 text-purple-500" />
                    Byte Payload Distribution Graph ({totalBytes} Total Bytes)
                </h3>
            </div>

            <!-- Distribution Progress Bar -->
            <div class="space-y-2">
                <div class="h-4 w-full rounded-full bg-surface-200 dark:bg-surface-900 overflow-hidden flex shadow-inner p-0.5">
                    <div 
                        class="h-full bg-sky-500 rounded-l-full transition-all duration-500 relative group"
                        style="width: {tagPct}%"
                        title="Tag Bytes: {tagBytesCount}B ({tagPct}%)"
                    ></div>
                    <div 
                        class="h-full bg-purple-500 transition-all duration-500 relative group"
                        style="width: {lenPct}%"
                        title="Length Bytes: {lenBytesCount}B ({lenPct}%)"
                    ></div>
                    <div 
                        class="h-full bg-amber-500 rounded-r-full transition-all duration-500 relative group"
                        style="width: {valPct}%"
                        title="Value Bytes: {valueBytesCount}B ({valPct}%)"
                    ></div>
                </div>

                <div class="grid grid-cols-3 gap-3 text-center text-xs font-mono pt-1">
                    <div class="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400">
                        <span class="block text-[10px] font-sans uppercase font-semibold">Tag Bytes</span>
                        <span class="text-sm font-bold">{tagBytesCount} Bytes ({tagPct}%)</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
                        <span class="block text-[10px] font-sans uppercase font-semibold">Length Bytes</span>
                        <span class="text-sm font-bold">{lenBytesCount} Bytes ({lenPct}%)</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                        <span class="block text-[10px] font-sans uppercase font-semibold">Payload Value</span>
                        <span class="text-sm font-bold">{valueBytesCount} Bytes ({valPct}%)</span>
                    </div>
                </div>
            </div>

            <!-- Segmented Stream View -->
            <div class="pt-2">
                <span class="text-xs font-semibold uppercase tracking-wider text-surface-400 block mb-2">
                    Deconstructed Hex Stream Slice Breakdown:
                </span>
                <div class="flex flex-wrap gap-2 font-mono text-xs">
                    {#each nodes as node}
                        <div class="p-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 flex items-center gap-1.5 shadow-sm">
                            <!-- Tag -->
                            <span class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-600 dark:text-sky-400 font-bold">
                                {node.tag}
                            </span>
                            <!-- Length -->
                            <span class="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold">
                                {node.lengthHex}
                            </span>
                            <!-- Value -->
                            <span class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-medium truncate max-w-[120px]">
                                {node.valueHex || '(empty)'}
                            </span>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>
