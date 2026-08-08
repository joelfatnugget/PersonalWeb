<script lang="ts">
    import { socials } from '$lib/data';
    import Icon from '@iconify/svelte';
</script>

<footer class="bg-surface-100-800-token p-10 mt-auto border-t border-surface-200/50 dark:border-surface-800/50">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-center md:text-left space-y-1">
            <p class="font-black text-xl text-surface-900 dark:text-white tracking-tight">Joel Tan</p>
            <p class="text-xs text-surface-500 font-medium">Software Engineer • Fullstack & GenAI</p>
        </div>

        <div class="flex items-center gap-3">
            {#each socials as social}
                <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    class="p-3 rounded-2xl bg-surface-200/70 dark:bg-surface-800/80 text-surface-700 dark:text-surface-200 hover:bg-primary-600 hover:text-white hover:scale-110 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                    aria-label={social.platform}
                    title={social.platform}
                >
                    <Icon icon={social.icon} class="text-2xl md:text-3xl group-hover:scale-110 transition-transform" />
                </a>
            {/each}
        </div>
    </div>
</footer>
