<script lang="ts">
    import { Hammer, Construction, Timer, ArrowLeft } from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';
</script>

<div class="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-4">
    <!-- Background Accents -->
    <div class="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px]"></div>
    </div>

    <div in:fly={{ y: 20, duration: 800 }} class="text-center max-w-2xl">
        <!-- Icon Animation -->
        <div class="relative mb-8 flex justify-center">
            <div class="absolute inset-0 scale-150 bg-primary-500/20 blur-2xl rounded-full animate-pulse"></div>
            <div class="relative bg-surface-100 dark:bg-surface-800 p-6 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-2xl">
                <Construction class="size-16 text-primary-500 animate-bounce" />
            </div>
        </div>

        <h1 class="h1 font-black mb-6 tracking-tighter">
            Application <span class="text-primary-500">Portal</span>
        </h1>
        
        <div class="space-y-4 mb-12">
            <p class="text-xl text-surface-600 dark:text-surface-300 font-medium">
                We're building something special here.
            </p>
            <p class="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
                This section will showcase my developed applications and interactive tools. I'm currently fine-tuning the experience. Check back soon!
            </p>
        </div>

        <!-- Progress Placeholder -->
        <div class="w-full max-w-sm mx-auto mb-12">
            <div class="flex justify-between text-xs font-mono mb-2 uppercase tracking-widest text-surface-500">
                <span>Development Progress</span>
                <span>45%</span>
            </div>
            <div class="h-2 w-full bg-surface-200 dark:bg-surface-800 rounded-full overflow-hidden border border-surface-300 dark:border-surface-700">
                <div class="h-full bg-primary-500 rounded-full" style="width: 45%"></div>
            </div>
        </div>

        <div class="flex flex-wrap justify-center gap-4">
            <a href="/" class="btn variant-filled-primary group">
                <ArrowLeft class="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                Back to Safety
            </a>
            <div class="btn variant-soft-surface cursor-default">
                <Timer class="mr-2 size-4" />
                Coming Q1 2026
            </div>
        </div>
    </div>
</div>

<style>
    /* Custom animation for the bounce to make it smoother */
    :global(.animate-bounce) {
        animation: bounce 2s infinite;
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
    }
</style>
