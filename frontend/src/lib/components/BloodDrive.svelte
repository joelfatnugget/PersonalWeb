<script lang="ts">
    import { Heart, Activity, Droplets, RefreshCw } from 'lucide-svelte';

    let { bloodData = [], updatedAt = 'Loading...' } = $props();
</script>

<div class="relative w-full max-w-5xl mx-auto my-12 p-8 md:p-12 rounded-3xl overflow-hidden group shadow-2xl">
    
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 transition-colors duration-500">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500 rounded-full blur-[120px] animate-pulse opacity-30 pointer-events-none"></div>
    </div>

    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
        
        <!-- Left: Call to Action -->
        <div class="text-center lg:text-left space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/50 backdrop-blur-md border border-red-400/30 text-xs font-bold uppercase tracking-wider text-red-100 mb-2">
                <Activity class="size-4 animate-pulse" />
                Tech for Good
            </div>
            
            <h2 class="text-4xl md:text-5xl font-extrabold leading-tight">
                Every Drop <br/>
                <span class="text-red-200">Saves a Life.</span>
            </h2>
            
            <p class="text-red-100 text-lg leading-relaxed opacity-90">
                I built an automated tracker to monitor national blood stocks in real-time. 
                Awareness is the first step to action.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <a 
                    href="https://www.giveblood.sg/" 
                    target="_blank"
                    class="btn bg-white text-red-700 hover:bg-red-50 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                    <Heart class="size-5 fill-red-600 animate-bounce" />
                    Book Donation Slot
                </a>
                <a 
                    href="https://github.com/joelfatnugget/BloodBankLevel" 
                    target="_blank"
                    class="btn variant-ringed-surface border-white/30 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <Activity class="size-5" />
                    View Source Code
                </a>
            </div>
        </div>

        <!-- Right: Live Data Dashboard -->
        <div class="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-inner">
            <div class="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div class="flex items-center gap-2">
                    <Droplets class="size-5 text-red-300" />
                    <h3 class="font-bold text-lg">National Blood Stocks</h3>
                </div>
                <div class="flex items-center gap-2 text-xs text-red-200 opacity-70">
                    <RefreshCw class="size-3" />
                    <span>Updated: {updatedAt}</span>
                </div>
            </div>

            <div class="grid grid-cols-4 gap-3">
                {#each bloodData as data}
                    <div class="flex flex-col items-center p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <span class="text-xl font-black mb-1">{data.type}</span>
                        
                        {#if data.level === 'Healthy'}
                            <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                                Healthy
                            </span>
                        {:else if data.level === 'Moderate'}
                            <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                                Moderate
                            </span>
                        {:else}
                            <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                                Critical
                            </span>
                        {/if}
                    </div>
                {/each}
            </div>
            
            <div class="mt-4 text-center">
                <p class="text-xs text-red-200/60 italic">Data source: Red Cross Singapore (Scraped)</p>
            </div>
        </div>

    </div>
</div>