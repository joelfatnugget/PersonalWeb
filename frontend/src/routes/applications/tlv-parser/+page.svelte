<script lang="ts">
    import { getSupportedCodePages, ebcdicToLiteral, literalToEbcdic, type SupportedCodePage } from '$lib/tlv/ebcdic';
    import { parseTLV, encodeTLV, type TLVNode } from '$lib/tlv/parser';
    import TLVNodeItem from '$lib/components/tlv/TLVNodeItem.svelte';
    import TLVVisualizer from '$lib/components/tlv/TLVVisualizer.svelte';
    import EBCDICMatrixInspector from '$lib/components/tlv/EBCDICMatrixInspector.svelte';
    import { 
        ArrowLeft, 
        Binary, 
        Type, 
        Layers, 
        RefreshCw, 
        Copy, 
        Check, 
        Trash2, 
        Sparkles, 
        Cpu, 
        Globe, 
        ArrowRightLeft,
        Code2,
        BookOpen,
        FileCode2,
        Activity,
        Grid
    } from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';

    const codePages = getSupportedCodePages();
    let selectedCodePage: SupportedCodePage = 'IBM1047';

    // Active Modes: 'parser' | 'visualizer' | 'matrix' | 'converter' | 'builder'
    let activeTab: 'parser' | 'visualizer' | 'matrix' | 'converter' | 'builder' = 'parser';

    // Parser State
    let inputHex = '6F1E8407A0000000031010A513500BC8C5D3D3D640E6D6D9D3C49F0206000000001000';

    let parsedNodes: TLVNode[] = [];
    let parseError = '';

    // Converter State (Hex <-> Literal)
    let convHex = 'C8C5D3D3D640E6D6D9D3C440F1F2F3'; // "HELLO WORLD 123" in IBM037 EBCDIC
    let convLiteral = '';
    let convDirection: 'hexToLiteral' | 'literalToHex' = 'hexToLiteral';

    // Builder State
    let buildTag = '50';
    let buildLiteral = 'VISA CREDIT';
    let builtHex = '';

    let copiedStatus: Record<string, boolean> = {};

    function copyToClipboard(key: string, text: string) {
        navigator.clipboard.writeText(text);
        copiedStatus[key] = true;
        setTimeout(() => {
            copiedStatus[key] = false;
            copiedStatus = { ...copiedStatus };
        }, 2000);
        copiedStatus = { ...copiedStatus };
    }

    // Reactive parse execution
    $: {
        try {
            if (inputHex.trim()) {
                parsedNodes = parseTLV(inputHex, { encoding: selectedCodePage });
                parseError = '';
            } else {
                parsedNodes = [];
                parseError = '';
            }
        } catch (err: any) {
            parseError = err?.message || 'Error parsing TLV structure';
            parsedNodes = [];
        }
    }

    // Reactive converter updates
    $: {
        if (convDirection === 'hexToLiteral') {
            convLiteral = ebcdicToLiteral(convHex, selectedCodePage);
        } else {
            convHex = literalToEbcdic(convLiteral, selectedCodePage);
        }
    }

    // Reactive builder updates
    $: {
        if (buildTag && buildLiteral !== undefined) {
            builtHex = encodeTLV(buildTag, buildLiteral, selectedCodePage);
        }
    }

    function handleConvHexChange(e: Event) {
        convDirection = 'hexToLiteral';
        convHex = (e.target as HTMLTextAreaElement).value;
    }

    function handleConvLiteralChange(e: Event) {
        convDirection = 'literalToHex';
        convLiteral = (e.target as HTMLInputElement).value;
    }

    // Preset Samples
    const presets = [
        {
            name: 'IBM EBCDIC Buffer (App Label + Amount)',
            hex: '500BC8C5D3D3D640E6D6D9D3C49F02060000000010005F2A020840',
            desc: 'Contains EBCDIC "HELLO WORLD", Amount $10.00, USD currency'
        },
        {
            name: 'EMV FCI Template (Constructed TLV)',
            hex: '6F1E8407A0000000031010A513500BC8C5D3D3D640E6D6D9D3C49F0206000000001000',
            desc: 'Nested BER-TLV template with DF Name, App Label, and Amount'
        },
        {
            name: 'IBM Mainframe Cardholder Info',
            hex: '5F200EE5C9E2C140C3D9C5D4C9E340F19F1A020840',
            desc: 'EBCDIC Cardholder Name ("VISA CREDIT 1") & Country Code'
        },
        {
            name: 'IBM943 Japanese (Shift-JIS)',
            hex: '500A82B182F182C982BF82CD9F1A020392',
            desc: 'Shift-JIS encoded "\u3053\u3093\u306b\u3061\u306f" (Konnichiwa) + Country Code Japan (0392). Select IBM943 code page first.'
        }
    ];

    function applyPreset(hex: string) {
        inputHex = hex;
        activeTab = 'parser';
    }

    function clearAll() {
        inputHex = '';
        parsedNodes = [];
    }
</script>

<svelte:head>
    <title>IBM Character Set TLV Parser & Visualizer | Application Portal</title>
    <meta name="description" content="High-performance TLV parser, interactive data flow visualizer, and 256-byte IBM EBCDIC character set matrix inspector." />
</svelte:head>

<div class="min-h-screen pb-16 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Header Navigation -->
    <div class="flex items-center justify-between mb-6">
        <a 
            href="/applications" 
            class="inline-flex items-center gap-2 text-sm font-medium text-surface-600 hover:text-primary-500 dark:text-surface-300 dark:hover:text-primary-400 transition-colors"
        >
            <ArrowLeft class="size-4" />
            Back to Application Portal
        </a>

        <div class="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
            <Cpu class="size-3.5" />
            <span>IBM Code Page Engine v1.0</span>
        </div>
    </div>

    <!-- Title Section -->
    <div class="mb-8" in:fly={{ y: -15, duration: 600 }}>
        <h1 class="h2 font-black tracking-tight mb-2 flex items-center gap-3">
            <div class="p-2.5 rounded-2xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
                <FileCode2 class="size-7" />
            </div>
            <span>IBM Character Set <span class="text-primary-500">TLV Parser & Visualizer</span></span>
        </h1>
        <p class="text-surface-600 dark:text-surface-300 max-w-3xl text-sm sm:text-base">
            Parse BER-TLV structures, inspect nested tag hierarchies, visualize interactive byte flow graphs, inspect full 256-byte IBM Character Set matrices, and perform bidirectional Hex &lt;-&gt; Raw Literal translations.
        </p>
    </div>

    <!-- Control Bar: IBM Code Page Selector & Tab Modes -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
        <!-- IBM Code Page Selector -->
        <div class="lg:col-span-5 bg-surface-100/80 dark:bg-surface-800/60 backdrop-blur-md p-4 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-sm flex flex-col justify-between">
            <div class="flex items-center justify-between mb-2">
                <label for="code-page-select" class="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 flex items-center gap-1.5">
                    <Globe class="size-3.5 text-primary-500" />
                    Select IBM Character Set (Code Page)
                </label>
                {#if selectedCodePage}
                    {@const currentCP = codePages.find(c => c.id === selectedCodePage)}
                    <span class="text-xs text-primary-600 dark:text-primary-400 font-mono">
                        {currentCP?.region}
                    </span>
                {/if}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select 
                    id="code-page-select"
                    bind:value={selectedCodePage}
                    class="w-full bg-surface-50 dark:bg-surface-900 border border-surface-300 dark:border-surface-700 rounded-xl px-3.5 py-2 text-sm font-mono font-medium focus:ring-2 focus:ring-primary-500 focus:outline-none"
                >
                    {#each codePages as cp}
                        <option value={cp.id}>
                            {cp.id} - {cp.name}
                        </option>
                    {/each}
                </select>

                {#if selectedCodePage}
                    {@const currentCP = codePages.find(c => c.id === selectedCodePage)}
                    <div class="text-xs text-surface-500 dark:text-surface-400 p-2 rounded-xl bg-surface-200/50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-800 flex items-center">
                        <span class="line-clamp-2">{currentCP?.description}</span>
                    </div>
                {/if}
            </div>
        </div>

        <!-- Mode Navigation Tabs -->
        <div class="lg:col-span-7 bg-surface-100/80 dark:bg-surface-800/60 backdrop-blur-md p-3 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-sm flex flex-col justify-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 px-1">
                Tool & Visualizer Mode Selection
            </span>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-1 bg-surface-200 dark:bg-surface-900 p-1 rounded-xl">
                <button 
                    class="flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all {activeTab === 'parser' ? 'bg-primary-500 text-white shadow' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'}"
                    on:click={() => activeTab = 'parser'}
                >
                    <Layers class="size-3.5" />
                    <span>Parser</span>
                </button>
                <button 
                    class="flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all {activeTab === 'visualizer' ? 'bg-primary-500 text-white shadow' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'}"
                    on:click={() => activeTab = 'visualizer'}
                >
                    <Activity class="size-3.5" />
                    <span>Pipeline</span>
                </button>
                <button 
                    class="flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all {activeTab === 'matrix' ? 'bg-primary-500 text-white shadow' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'}"
                    on:click={() => activeTab = 'matrix'}
                >
                    <Grid class="size-3.5" />
                    <span>Matrix</span>
                </button>
                <button 
                    class="flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all {activeTab === 'converter' ? 'bg-primary-500 text-white shadow' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'}"
                    on:click={() => activeTab = 'converter'}
                >
                    <ArrowRightLeft class="size-3.5" />
                    <span>Translator</span>
                </button>
                <button 
                    class="flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all {activeTab === 'builder' ? 'bg-primary-500 text-white shadow' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'}"
                    on:click={() => activeTab = 'builder'}
                >
                    <Code2 class="size-3.5" />
                    <span>Builder</span>
                </button>
            </div>
        </div>
    </div>

    <!-- TAB 1: TLV PARSER & TREE INSPECTOR -->
    {#if activeTab === 'parser'}
        <div in:fade={{ duration: 250 }} class="space-y-6">
            <!-- Sample Presets Toolbar -->
            <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-surface-100/60 dark:bg-surface-800/40 border border-surface-200 dark:border-surface-700/60">
                <span class="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 flex items-center gap-1.5">
                    <Sparkles class="size-3.5 text-amber-500" /> Quick Sample Presets:
                </span>
                <div class="flex flex-wrap gap-2">
                    {#each presets as preset}
                        <button 
                            class="px-3 py-1.5 rounded-xl text-xs font-medium bg-surface-200/80 dark:bg-surface-700/60 hover:bg-primary-500/20 hover:text-primary-600 dark:hover:text-primary-300 border border-surface-300 dark:border-surface-600 transition-colors"
                            on:click={() => applyPreset(preset.hex)}
                            title={preset.desc}
                        >
                            {preset.name}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Hex Input Box -->
            <div class="bg-surface-100/80 dark:bg-surface-800/60 backdrop-blur-md p-5 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-sm space-y-3">
                <div class="flex items-center justify-between">
                    <label for="hex-input" class="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 flex items-center gap-2">
                        <Binary class="size-4 text-sky-500" /> TLV Hex Payload
                    </label>

                    <div class="flex items-center gap-2">
                        <button 
                            class="flex items-center gap-1 text-xs text-surface-500 hover:text-rose-500 transition-colors"
                            on:click={clearAll}
                        >
                            <Trash2 class="size-3.5" /> Clear
                        </button>
                        <button 
                            class="flex items-center gap-1 text-xs text-surface-500 hover:text-primary-500 transition-colors"
                            on:click={() => copyToClipboard('inputHex', inputHex)}
                        >
                            {#if copiedStatus['inputHex']}
                                <Check class="size-3.5 text-emerald-500" /> Copied
                            {:else}
                                <Copy class="size-3.5" /> Copy Payload
                            {/if}
                        </button>
                    </div>
                </div>

                <textarea 
                    id="hex-input"
                    bind:value={inputHex}
                    rows="3"
                    placeholder="Enter BER-TLV hex string e.g. 9F0206000000001000..."
                    class="w-full bg-surface-50 dark:bg-surface-900 border border-surface-300 dark:border-surface-700 rounded-2xl p-4 font-mono text-sm tracking-wider text-sky-600 dark:text-sky-400 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-y"
                ></textarea>

                {#if parseError}
                    <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-mono">
                        {parseError}
                    </div>
                {/if}
            </div>

            <!-- Parsed Tree Result -->
            <div class="bg-surface-100/80 dark:bg-surface-800/60 backdrop-blur-md p-5 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-sm space-y-4">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 flex items-center gap-2">
                        <Layers class="size-4 text-emerald-500" />
                        Parsed TLV Hierarchy ({parsedNodes.length} Root Tag{parsedNodes.length === 1 ? '' : 's'})
                    </h3>

                    {#if parsedNodes.length > 0}
                        <button 
                            class="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:underline font-mono"
                            on:click={() => copyToClipboard('jsonTree', JSON.stringify(parsedNodes, null, 2))}
                        >
                            {#if copiedStatus['jsonTree']}
                                <Check class="size-3.5 text-emerald-500" /> Copied JSON
                            {:else}
                                <Copy class="size-3.5" /> Export JSON
                            {/if}
                        </button>
                    {/if}
                </div>

                {#if parsedNodes.length > 0}
                    <div class="space-y-3">
                        {#each parsedNodes as node}
                            <TLVNodeItem {node} />
                        {/each}
                    </div>
                {:else if !parseError}
                    <div class="p-12 text-center text-surface-400 dark:text-surface-500 space-y-2">
                        <Layers class="size-10 mx-auto stroke-1 text-surface-300 dark:text-surface-600" />
                        <p class="text-sm font-medium">No TLV tags parsed yet</p>
                        <p class="text-xs">Paste a hex payload above or select one of the quick sample presets.</p>
                    </div>
                {/if}
            </div>
        </div>

    <!-- TAB 2: INTERACTIVE PIPELINE VISUALIZER -->
    {:else if activeTab === 'visualizer'}
        <div in:fade={{ duration: 250 }}>
            <TLVVisualizer nodes={parsedNodes} {inputHex} {selectedCodePage} />
        </div>

    <!-- TAB 3: 256-BYTE IBM CODE PAGE MATRIX INSPECTOR -->
    {:else if activeTab === 'matrix'}
        <div in:fade={{ duration: 250 }}>
            <EBCDICMatrixInspector {selectedCodePage} />
        </div>

    <!-- TAB 4: HEX <-> RAW LITERAL CONVERTER -->
    {:else if activeTab === 'converter'}
        <div in:fade={{ duration: 250 }} class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Hex Panel -->
            <div class="bg-surface-100/80 dark:bg-surface-800/60 backdrop-blur-md p-5 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-sm space-y-3">
                <div class="flex items-center justify-between">
                    <label for="conv-hex" class="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 flex items-center gap-2">
                        <Binary class="size-4 text-sky-500" /> Hex Representation
                    </label>
                    <button 
                        class="text-xs text-surface-500 hover:text-primary-500 flex items-center gap-1"
                        on:click={() => copyToClipboard('convHex', convHex)}
                    >
                        {#if copiedStatus['convHex']}
                            <Check class="size-3.5 text-emerald-500" /> Copied
                        {:else}
                            <Copy class="size-3.5" /> Copy Hex
                        {/if}
                    </button>
                </div>

                <textarea 
                    id="conv-hex"
                    value={convHex}
                    on:input={handleConvHexChange}
                    rows="6"
                    placeholder="Enter hex bytes e.g. C8C5D3D3D6..."
                    class="w-full bg-surface-50 dark:bg-surface-900 border border-surface-300 dark:border-surface-700 rounded-2xl p-4 font-mono text-sm tracking-widest text-sky-600 dark:text-sky-400 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-y"
                ></textarea>
                <div class="text-[11px] text-surface-400 font-mono">
                    Byte Count: {Math.floor(convHex.replace(/[^0-9a-fA-F]/g, '').length / 2)} bytes
                </div>
            </div>

            <!-- Raw Literal Panel -->
            <div class="bg-surface-100/80 dark:bg-surface-800/60 backdrop-blur-md p-5 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-sm space-y-3">
                <div class="flex items-center justify-between">
                    <label for="conv-literal" class="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 flex items-center gap-2">
                        <Type class="size-4 text-amber-500" /> Raw Literal Text ({selectedCodePage})
                    </label>
                    <button 
                        class="text-xs text-surface-500 hover:text-primary-500 flex items-center gap-1"
                        on:click={() => copyToClipboard('convLit', convLiteral)}
                    >
                        {#if copiedStatus['convLit']}
                            <Check class="size-3.5 text-emerald-500" /> Copied
                        {:else}
                            <Copy class="size-3.5" /> Copy Text
                        {/if}
                    </button>
                </div>

                <textarea 
                    id="conv-literal"
                    value={convLiteral}
                    on:input={handleConvLiteralChange}
                    rows="6"
                    placeholder="Enter text e.g. HELLO WORLD..."
                    class="w-full bg-surface-50 dark:bg-surface-900 border border-surface-300 dark:border-surface-700 rounded-2xl p-4 font-sans text-sm text-amber-600 dark:text-amber-300 font-medium focus:ring-2 focus:ring-primary-500 focus:outline-none resize-y"
                ></textarea>
                <div class="text-[11px] text-surface-400 font-mono">
                    Character Count: {convLiteral.length} chars
                </div>
            </div>
        </div>

    <!-- TAB 5: TLV BUILDER & ENCODER -->
    {:else if activeTab === 'builder'}
        <div in:fade={{ duration: 250 }} class="max-w-3xl mx-auto bg-surface-100/80 dark:bg-surface-800/60 backdrop-blur-md p-6 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-sm space-y-6">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 flex items-center gap-2">
                <Code2 class="size-4 text-purple-500" /> Construct Single TLV Element
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Tag Input -->
                <div class="space-y-1.5">
                    <label for="build-tag" class="text-xs font-mono text-surface-500">Tag (Hex e.g. 50, 9F02, 5F20)</label>
                    <input 
                        id="build-tag"
                        type="text" 
                        bind:value={buildTag}
                        placeholder="50"
                        class="w-full bg-surface-50 dark:bg-surface-900 border border-surface-300 dark:border-surface-700 rounded-xl px-4 py-2.5 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    />
                </div>

                <!-- Raw Text Input -->
                <div class="space-y-1.5">
                    <label for="build-literal" class="text-xs font-mono text-surface-500">Literal Value (Text to encode)</label>
                    <input 
                        id="build-literal"
                        type="text" 
                        bind:value={buildLiteral}
                        placeholder="VISA CREDIT"
                        class="w-full bg-surface-50 dark:bg-surface-900 border border-surface-300 dark:border-surface-700 rounded-xl px-4 py-2.5 font-sans text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    />
                </div>
            </div>

            <!-- Built Output -->
            <div class="p-4 rounded-2xl bg-surface-200/50 dark:bg-surface-900/80 border border-surface-300 dark:border-surface-700 space-y-3">
                <div class="flex items-center justify-between text-xs font-mono text-surface-500">
                    <span>Generated TLV Hex Output ({selectedCodePage})</span>
                    <button 
                        class="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                        on:click={() => copyToClipboard('builtHex', builtHex)}
                    >
                        {#if copiedStatus['builtHex']}
                            <Check class="size-3.5 text-emerald-500" /> Copied
                        {:else}
                            <Copy class="size-3.5" /> Copy Hex
                        {/if}
                    </button>
                </div>
                <div class="break-all font-mono text-base font-bold text-emerald-600 dark:text-emerald-400 select-all">
                    {builtHex || '(invalid tag or empty value)'}
                </div>

                <!-- Explanation Breakdown Card -->
                {#if builtHex}
                    {@const valLen = buildLiteral.length}
                    {@const hexLen = valLen <= 15 ? `0${valLen.toString(16).toUpperCase()}` : valLen.toString(16).toUpperCase()}
                    <div class="pt-2 border-t border-surface-300/60 dark:border-surface-700/60 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                        <div class="p-2 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                            <span class="block text-[10px] text-surface-400 font-sans">Tag (Hex)</span>
                            <span class="font-bold">0x{buildTag.toUpperCase()}</span>
                        </div>
                        <div class="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                            <span class="block text-[10px] text-surface-400 font-sans">Length Field</span>
                            <span class="font-bold">0x{hexLen} ({valLen} bytes)</span>
                        </div>
                        <div class="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <span class="block text-[10px] text-surface-400 font-sans">Value Bytes ({selectedCodePage})</span>
                            <span class="font-bold">{valLen} Bytes</span>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
</div>
